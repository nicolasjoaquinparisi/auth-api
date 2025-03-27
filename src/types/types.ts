import { ERoles } from "@prisma/client";

export type TGenerateTokensServiceResponse = {
  accessToken: string;
  expiresAt: Date;
};

export type TTokenPayload = {
  sub: string;
  scope: ERoles;
};

export type TDecodedAccessToken = {
  sub: string;
  scope: ERoles;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
};
