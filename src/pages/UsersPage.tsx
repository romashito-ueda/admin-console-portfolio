import { Button, Empty, Input, Space, Spin, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { SorterResult } from 'antd/es/table/interface';
import { Link } from 'react-router-dom';
import { ApiErrorAlert } from '../shared/components/ApiErrorAlert';
import { PageLayout } from '../shared/components/PageLayout';
import { useUsersQuery } from '../features/users/queries';
import { useUsersSearchParams } from '../features/users/useUsersSearchParams';
import type { User } from '../features/users/types';

const columns: ColumnsType<User> = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: (_value, record) => <Link to={`/users/${record.id}`}>{record.name}</Link>,
  },
  { title: 'Email', dataIndex: 'email', sorter: true },
  { title: 'Role', dataIndex: 'role' },
  { title: 'Status', dataIndex: 'status' },
  { title: 'Created', dataIndex: 'createdAt', sorter: true },
  {
    title: 'Actions',
    key: 'actions',
    render: (_value, record) => (
      <Button type="link">
        <Link to={`/users/${record.id}/edit`}>Edit</Link>
      </Button>
    ),
  },
];

export const UsersPage = () => {
  const { params, updateParams } = useUsersSearchParams();
  const { data, isLoading, isError, error } = useUsersQuery(params);

  const handleTableChange = (pagination: TablePaginationConfig, _filters: unknown, sorter: SorterResult<User> | SorterResult<User>[]) => {
    const normalizedSorter = Array.isArray(sorter) ? sorter[0] : sorter;
    const sortBy = normalizedSorter?.field;
    const sortDir = normalizedSorter?.order === 'ascend' ? 'asc' : normalizedSorter?.order === 'descend' ? 'desc' : params.sortDir;

    updateParams({
      page: pagination.current ?? params.page,
      pageSize: pagination.pageSize ?? params.pageSize,
      sortBy: sortBy === 'name' || sortBy === 'email' || sortBy === 'createdAt' ? sortBy : params.sortBy,
      sortDir,
    });
  };

  return (
    <PageLayout title="Users" breadcrumbItems={[{ title: 'Users' }]}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input.Search
          placeholder="Search users"
          defaultValue={params.q}
          allowClear
          onSearch={(q) => updateParams({ q, page: 1 })}
          style={{ maxWidth: 360 }}
        />

        {isLoading && <Spin />}
        {isError && <ApiErrorAlert error={error} />}
        {!isLoading && !isError && (data?.data.length ?? 0) === 0 && <Empty description="ユーザーが見つかりません" />}

        {!isLoading && !isError && data && (
          <Table<User>
            rowKey="id"
            columns={columns}
            dataSource={data.data}
            pagination={{
              current: params.page,
              pageSize: params.pageSize,
              total: data.total,
              showSizeChanger: true,
            }}
            onChange={handleTableChange}
          />
        )}
      </Space>
    </PageLayout>
  );
};
