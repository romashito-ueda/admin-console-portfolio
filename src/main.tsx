import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoot } from './app/AppRoot';
import { startMockServiceWorker } from './mocks/browser';
import 'antd/dist/reset.css';

const bootstrap = async () => {
  await startMockServiceWorker();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AppRoot />
    </React.StrictMode>,
  );
};

void bootstrap();
