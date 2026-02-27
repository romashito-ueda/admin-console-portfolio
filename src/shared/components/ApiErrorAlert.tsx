import { Alert } from 'antd';
import { HttpError } from '../api/httpError';

type Props = {
  error: unknown;
};

export const ApiErrorAlert = ({ error }: Props) => {
  const description = error instanceof HttpError ? error.body?.message ?? error.message : '予期しないエラーが発生しました。';

  return <Alert message="エラー" description={description} type="error" showIcon />;
};
