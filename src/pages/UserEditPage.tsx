import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, Modal, Select, Space, Spin } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useUpdateUserMutation, useUserDetailQuery } from '../features/users/queries';
import { ApiErrorAlert } from '../shared/components/ApiErrorAlert';
import { HttpError } from '../shared/api/httpError';
import { PageLayout } from '../shared/components/PageLayout';
import { useAppNotification } from '../shared/hooks/useAppNotification';

const schema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z.string().email('メールアドレス形式で入力してください'),
  role: z.enum(['admin', 'editor', 'viewer']),
  status: z.enum(['active', 'inactive']),
});

type FormValue = z.infer<typeof schema>;

export const UserEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { success, error: notifyError } = useAppNotification();
  const { data, isLoading, isError, error } = useUserDetailQuery(id);
  const mutation = useUpdateUserMutation(id ?? '');

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<FormValue>({
    resolver: zodResolver(schema),
    values: {
      name: data?.name ?? '',
      email: data?.email ?? '',
      role: data?.role ?? 'viewer',
      status: data?.status ?? 'active',
    },
  });

  const onOpenConfirm = () => setConfirmOpen(true);

  const onConfirmSave = async () => {
    if (!id) {
      return;
    }
    const values = getValues();
    try {
      await mutation.mutateAsync(values);
      success('保存しました', 'ユーザー情報を更新しました。');
      navigate(`/users/${id}`);
    } catch (mutationError) {
      if (mutationError instanceof HttpError) {
        notifyError('保存に失敗しました', mutationError.body?.message ?? mutationError.message);
      } else {
        notifyError('保存に失敗しました', '予期しないエラーが発生しました。');
      }
    } finally {
      setConfirmOpen(false);
    }
  };

  return (
    <PageLayout
      title="Edit User"
      breadcrumbItems={[{ title: 'Users', href: '/users' }, { title: id ?? 'edit' }]}
      extra={
        <Button>
          <Link to={`/users/${id}`}>Back</Link>
        </Button>
      }
    >
      {isLoading && <Spin />}
      {isError && <ApiErrorAlert error={error} />}
      {data && (
        <Form layout="vertical" onFinish={handleSubmit(onOpenConfirm)}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Form.Item label="Name" validateStatus={errors.name ? 'error' : undefined} help={errors.name?.message}>
                <Input {...field} />
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Form.Item label="Email" validateStatus={errors.email ? 'error' : undefined} help={errors.email?.message}>
                <Input {...field} />
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <Form.Item label="Role">
                <Select {...field} options={[{ value: 'admin' }, { value: 'editor' }, { value: 'viewer' }]} />
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Form.Item label="Status">
                <Select {...field} options={[{ value: 'active' }, { value: 'inactive' }]} />
              </Form.Item>
            )}
          />
          <Space>
            <Button htmlType="submit" type="primary" loading={mutation.isPending}>
              Save
            </Button>
          </Space>
        </Form>
      )}
      <Modal
        title="変更を保存しますか？"
        open={confirmOpen}
        onOk={() => void onConfirmSave()}
        onCancel={() => setConfirmOpen(false)}
        confirmLoading={mutation.isPending}
      >
        入力内容を保存します。
      </Modal>
    </PageLayout>
  );
};
