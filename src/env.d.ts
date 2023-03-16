interface ImportMetaEnv {
  VITE_BASE_URL: string
  VITE_SERVER_API_URL: string
  VITE_APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
