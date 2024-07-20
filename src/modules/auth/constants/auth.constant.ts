export const CAuthMessage = {
  Success: 'Login Successfully',
  AccessTokenExpire: 'Access token expire',
  RefreshTokenExpire: 'Refresh token expire',
  LoginFaild: 'Email and password not match',
  UserInActiveOrDelete: 'User not active or deleted'
};

export enum ENUM_ACCESS_TOKEN_CODE_ERROR {
  ACCESS_TOKEN_EXPIRE_CODE = 5021,
  ACCESS_TOKEN_INVALID_CODE = 5022,
}

export enum ENUM_USER_ROLE_AND_STATUS_ERROR {
  USER_DELETE_OR_INACTIVE = 4021
}

export enum ENUM_REFRESH_TOKEN_CODE_ERROR {
  REFRESH_TOKEN_EXPIRE_CODE = 6021,
  REFRESH_TOKEN_INVALID_CODE = 6022,
}
