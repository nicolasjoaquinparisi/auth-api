export type TUser = {
  id: string;
  role: string;
  permissions: string[];
};

export type TDecodedAccessToken = {
  payload: TUser;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
};
