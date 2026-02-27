import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export const vitestConfig = defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setupTests.ts'],
    globals: true,
  },
});

export default vitestConfig;
