// Augment the NodeJS ProcessEnv interface to include API_KEY.
// This handles the case where 'process' is already defined by @types/node, avoiding redeclaration errors.
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
  }
}
