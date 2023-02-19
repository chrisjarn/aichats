/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
declare module 'fs-browsers';
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
