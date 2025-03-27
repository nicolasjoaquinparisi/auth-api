import { EnvType, load } from "ts-dotenv";

export type Env = EnvType<typeof schema>;

export const schema = {
  NODE_ENV: String,
  API_PORT: String,
  DATABASE_URL: {
    type: String,
    optional: true,
  },
  ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS: Number,
  TOKEN_ISSUER: String,
  ACCESS_TOKEN_SECRET: String,
  TEST_DATABASE_URL: String,
};

export let env: Env;

export function loadEnv(): void {
  env = load(schema);
}

loadEnv();
