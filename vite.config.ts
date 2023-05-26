import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
      test: resolve(__dirname, 'test'),
    },
  },
  plugins: [react()],
});
