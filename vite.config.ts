import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      tailwindcss()
  ],
  base: "/green-api-chat/",
  resolve: {
     alias: {
         '@': path.resolve(__dirname, 'src'),
         '@app': path.resolve(__dirname, 'src/app'),
         '@assets': path.resolve(__dirname, 'src/assets'),
         '@modules': path.resolve(__dirname, 'src/modules'),
         '@providers': path.resolve(__dirname, 'src/providers'),
         '@pages': path.resolve(__dirname, 'src/pages'),
         '@shared': path.resolve(__dirname, 'src/shared'),
     },
  },
})
