import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiHeader,
  ApiHeaders,
  ApiParam,
  ApiProduces,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
  getSchemaPath,
} from '@nestjs/swagger';
import { ENUM_FILE_EXCEL_MIME } from 'src/common/file/constants/file.enum.constant';
import { FileMultipleDto } from 'src/common/file/dtos/file.multiple.dto';
import { FileSingleDto } from 'src/common/file/dtos/file.single.dto';
import { Skip } from 'src/common/request/validations/request.skip.validation';
import { ResponseDefaultSerialization } from 'src/common/response/serializations/response.default.serialization';
import {
  ENUM_DOC_REQUEST_BODY_TYPE,
  ENUM_DOC_RESPONSE_BODY_TYPE,
} from '../constants/doc.enum.constant';
import {
  IDocDefaultOptions,
  IDocOfOptions,
  IDocOptions,
} from '../interfaces/doc.interface';

export enum ENUM_AUTH_STATUS_CODE_ERROR {
  AUTH_JWT_ACCESS_TOKEN_ERROR = 5000,
  AUTH_JWT_REFRESH_TOKEN_ERROR = 5001,
}

export enum ENUM_API_KEY_STATUS_CODE_ERROR {
  API_KEY_NEEDED_ERROR = 5020,
  API_KEY_NOT_FOUND_ERROR = 5021,
  API_KEY_IS_ACTIVE_ERROR = 5022,
  API_KEY_EXPIRED_ERROR = 5023,
  API_KEY_INACTIVE_ERROR = 5024,
  API_KEY_INVALID_ERROR = 5025,
  API_KEY_WRONG_ERROR = 5026,
  API_KEY_EXIST_ERROR = 5027,
}

export enum ENUM_REQUEST_STATUS_CODE_ERROR {
  REQUEST_VALIDATION_ERROR = 5070,
  REQUEST_TIMESTAMP_INVALID_ERROR = 5071,
  REQUEST_USER_AGENT_INVALID_ERROR = 5072,
  REQUEST_USER_AGENT_OS_INVALID_ERROR = 5073,
  REQUEST_USER_AGENT_BROWSER_INVALID_ERROR = 5074,
}

export enum ENUM_ROLE_STATUS_CODE_ERROR {
  ROLE_NOT_FOUND_ERROR = 5100,
  ROLE_PAYLOAD_TYPE_INVALID_ERROR = 5101,
  ROLE_EXIST_ERROR = 5102,
  ROLE_IS_ACTIVE_ERROR = 5103,
  ROLE_INACTIVE_ERROR = 5104,
}

export enum ENUM_ERROR_STATUS_CODE_ERROR {
  ERROR_UNKNOWN = 5050,
  ERROR_SERVICE_UNAVAILABLE = 5051,
  ERROR_REQUEST_TIMEOUT = 5052,
}

export function Doc<T>(
  messagePath: string,
  options?: IDocOptions<T>
): MethodDecorator {
  const docs = [];

  const normDoc: IDocDefaultOptions = {
    httpStatus: options?.response?.httpStatus ?? HttpStatus.OK,
    messagePath,
    statusCode: options?.response?.statusCode,
  };

  if (!normDoc.statusCode) {
    normDoc.statusCode = normDoc.httpStatus;
  }

  if (options?.request?.bodyType === ENUM_DOC_REQUEST_BODY_TYPE.FORM_DATA) {
    docs.push(ApiConsumes('multipart/form-data'));

    if (options?.request?.file?.multiple) {
      docs.push(
        ApiBody({
          description: 'Multiple file',
          type: FileMultipleDto,
        })
      );
    } else if (!options?.request?.file?.multiple) {
      docs.push(
        ApiBody({
          description: 'Single file',
          type: FileSingleDto,
        })
      );
    }
  } else if (options?.request?.bodyType === ENUM_DOC_REQUEST_BODY_TYPE.TEXT) {
    docs.push(ApiConsumes('text/plain'));
  } else {
    docs.push(ApiConsumes('application/json'));
  }

  if (options?.response?.bodyType === ENUM_DOC_RESPONSE_BODY_TYPE.FILE) {
    docs.push(ApiProduces(ENUM_FILE_EXCEL_MIME.XLSX));
  } else if (options?.response?.bodyType === ENUM_DOC_RESPONSE_BODY_TYPE.TEXT) {
    docs.push(ApiProduces('text/plain'));
  } else {
    docs.push(ApiProduces('application/json'));
    if (options?.response?.serialization) {
      normDoc.serialization = options?.response?.serialization;
    }
  }
  docs.push(DocDefault(normDoc));

  if (options?.request?.params) {
    docs.push(...options?.request?.params.map((param) => ApiParam(param)));
  }

  if (options?.request?.queries) {
    docs.push(...options?.request?.queries.map((query) => ApiQuery(query)));
  }

  const oneOfUnauthorized: IDocOfOptions[] = [];
  const oneOfForbidden: IDocOfOptions[] = [];

  // auth
  const auths = [];
  if (options?.auth?.jwtRefreshToken) {
    auths.push(ApiBearerAuth('refreshToken'));
    oneOfUnauthorized.push({
      messagePath: 'auth.error.refreshTokenUnauthorized',
      statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_JWT_REFRESH_TOKEN_ERROR,
    });
  }

  if (options?.auth?.jwtAccessToken) {
    auths.push(ApiBearerAuth('accessToken'));
    oneOfUnauthorized.push({
      messagePath: 'auth.error.accessTokenUnauthorized',
      statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_JWT_ACCESS_TOKEN_ERROR,
    });
    oneOfForbidden.push({
      statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_PAYLOAD_TYPE_INVALID_ERROR,
      messagePath: 'role.error.typeForbidden',
    });
  }

  if (options?.auth?.apiKey) {
    auths.push(ApiSecurity('apiKey'));
    oneOfUnauthorized.push(
      {
        statusCode: ENUM_API_KEY_STATUS_CODE_ERROR.API_KEY_NEEDED_ERROR,
        messagePath: 'apiKey.error.keyNeeded',
      },
      {
        statusCode: ENUM_API_KEY_STATUS_CODE_ERROR.API_KEY_NOT_FOUND_ERROR,
        messagePath: 'apiKey.error.notFound',
      },
      {
        statusCode: ENUM_API_KEY_STATUS_CODE_ERROR.API_KEY_INACTIVE_ERROR,
        messagePath: 'apiKey.error.inactive',
      },
      {
        statusCode: ENUM_API_KEY_STATUS_CODE_ERROR.API_KEY_INVALID_ERROR,
        messagePath: 'apiKey.error.invalid',
      }
    );
  }

  // request headers
  const requestHeaders = [];
  if (options?.requestHeader?.userAgent) {
    oneOfForbidden.push(
      {
        statusCode:
          ENUM_REQUEST_STATUS_CODE_ERROR.REQUEST_USER_AGENT_INVALID_ERROR,
        messagePath: 'request.error.userAgentInvalid',
      },
      {
        statusCode:
          ENUM_REQUEST_STATUS_CODE_ERROR.REQUEST_USER_AGENT_BROWSER_INVALID_ERROR,
        messagePath: 'request.error.userAgentBrowserInvalid',
      },
      {
        statusCode:
          ENUM_REQUEST_STATUS_CODE_ERROR.REQUEST_USER_AGENT_OS_INVALID_ERROR,
        messagePath: 'request.error.userAgentOsInvalid',
      }
    );
    requestHeaders.push({
      name: 'user-agent',
      description: 'User agent header',
      required: true,
      schema: {
        example:
          'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion',
        type: 'string',
      },
    });
  }

  if (options?.requestHeader?.timestamp) {
    oneOfForbidden.push({
      statusCode:
        ENUM_REQUEST_STATUS_CODE_ERROR.REQUEST_TIMESTAMP_INVALID_ERROR,
      messagePath: 'request.error.timestampInvalid',
    });
    requestHeaders.push({
      name: 'x-timestamp',
      description: 'Timestamp header, in microseconds',
      required: true,
      schema: {
        example: 1662876305642,
        type: 'number',
      },
    });
  }

  return applyDecorators(
    ApiHeader({
      name: 'x-custom-lang',
      description: 'Custom language header',
      required: false,
      schema: {
        default: 'en',
        example: 'en',
        type: 'string',
      },
    }),
    ApiHeaders(requestHeaders),
    DocDefault({
      httpStatus: HttpStatus.SERVICE_UNAVAILABLE,
      messagePath: 'http.serverError.serviceUnavailable',
      statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_SERVICE_UNAVAILABLE,
    }),
    DocDefault({
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      messagePath: 'http.serverError.internalServerError',
      statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
    }),
    DocDefault({
      httpStatus: HttpStatus.REQUEST_TIMEOUT,
      messagePath: 'http.serverError.requestTimeout',
      statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_REQUEST_TIMEOUT,
    }),
    oneOfForbidden.length > 0
      ? DocOneOf(HttpStatus.FORBIDDEN, ...oneOfForbidden)
      : Skip(),
    oneOfUnauthorized.length > 0
      ? DocOneOf(HttpStatus.UNAUTHORIZED, ...oneOfUnauthorized)
      : Skip(),
    ...auths,
    ...docs
  );
}

export function DocDefault<T>(options: IDocDefaultOptions): MethodDecorator {
  const docs = [];
  const schema: Record<string, any> = {
    allOf: [{ $ref: getSchemaPath(ResponseDefaultSerialization<T>) }],
    properties: {
      message: {
        example: options.messagePath,
      },
      statusCode: {
        type: 'number',
        example: options.statusCode,
      },
    },
  };

  if (options.serialization) {
    docs.push(ApiExtraModels(options.serialization));
    schema.properties = {
      ...schema.properties,
      data: {
        $ref: getSchemaPath(options.serialization),
      },
    };
  }

  return applyDecorators(
    ApiExtraModels(ResponseDefaultSerialization<T>),
    ApiResponse({
      status: options.httpStatus,
      schema,
    }),
    ...docs
  );
}

export function DocOneOf<T>(
  httpStatus: HttpStatus,
  ...documents: IDocOfOptions[]
): MethodDecorator {
  const docs = [];
  const oneOf = [];

  for (const doc of documents) {
    const oneOfSchema: Record<string, any> = {
      allOf: [{ $ref: getSchemaPath(ResponseDefaultSerialization<T>) }],
      properties: {
        message: {
          example: doc.messagePath,
        },
        statusCode: {
          type: 'number',
          example: doc.statusCode ?? HttpStatus.OK,
        },
      },
    };

    if (doc.serialization) {
      docs.push(ApiExtraModels(doc.serialization));
      oneOfSchema.properties = {
        ...oneOfSchema.properties,
        data: {
          $ref: getSchemaPath(doc.serialization),
        },
      };
    }

    oneOf.push(oneOfSchema);
  }

  return applyDecorators(
    ApiExtraModels(ResponseDefaultSerialization<T>),
    ApiResponse({
      status: httpStatus,
      schema: {
        oneOf,
      },
    }),
    ...docs
  );
}
