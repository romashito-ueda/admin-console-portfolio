import { Button, Descriptions, Space, Spin } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useUserDetailQuery } from '../features/users/queries';
import { ApiErrorAlert } from '../shared/components/ApiErrorAlert';
import { PageLayout } from '../shared/components/PageLayout';

export const UserDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useUserDetailQuery(id);

  return (
    <PageLayout
      title="User Detail"
      breadcrumbItems={[{ title: 'Users', href: '/users' }, { title: id ?? 'detail' }]}
      extra={
        <Space>
          <Button>
            <Link to="/users">Back</Link>
          </Button>
          <Button type="primary">
            <Link to={`/users/${id}/edit`}>Edit</Link>
          </Button>
        </Space>
      }
    >
      {isLoading && <Spin />}
      {isError && <ApiErrorAlert error={error} />}
      {data && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
          <Descriptions.Item label="Role">{data.role}</Descriptions.Item>
          <Descriptions.Item label="Status">{data.status}</Descriptions.Item>
          <Descriptions.Item label="Created">{data.createdAt}</Descriptions.Item>
        </Descriptions>
      )}
    </PageLayout>
  );
};
