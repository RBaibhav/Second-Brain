declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    SALT: string;
    DATABASE_URL: string;
  }
}
