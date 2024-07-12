export const CAuthMessage = {
  Success: 'Login Successfully',
  AccessTokenExpire: 'Access token expire',
  RefreshTokenExpire: 'Refresh token expire',
};

export enum ENUM_ACCESS_TOKEN_CODE_ERROR {
  ACCESS_TOKEN_EXPIRE_CODE = 5021,
  ACCESS_TOKEN_INVALID_CODE = 5022,
}

export enum ENUM_REFRESH_TOKEN_CODE_ERROR {
  REFRESH_TOKEN_EXPIRE_CODE = 6021,
  REFRESH_TOKEN_INVALID_CODE = 6022,
}
