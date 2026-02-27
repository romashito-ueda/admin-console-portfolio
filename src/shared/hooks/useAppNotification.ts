import { App } from 'antd';

export const useAppNotification = () => {
  const { notification } = App.useApp();

  return {
    success: (message: string, description?: string) => notification.success({ message, description }),
    error: (message: string, description?: string) => notification.error({ message, description }),
  };
};
