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
         '@': path.resolve(import.meta.dirname, 'src'),
         '@app': path.resolve(import.meta.dirname, 'src/app'),
         '@assets': path.resolve(import.meta.dirname, 'src/assets'),
         '@modules': path.resolve(import.meta.dirname, 'src/modules'),
         '@providers': path.resolve(import.meta.dirname, 'src/providers'),
         '@pages': path.resolve(import.meta.dirname, 'src/pages'),
         '@shared': path.resolve(import.meta.dirname, 'src/shared'),
     },
  },
})
