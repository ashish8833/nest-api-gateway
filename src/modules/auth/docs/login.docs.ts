import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ENUM_DOC_REQUEST_BODY_TYPE } from 'src/common/doc/constants/doc.enum.constant';
import { Doc } from 'src/common/doc/decorators/doc.decorator';
import { CAuthMessage } from '../constants/auth.constant';
import { LoginSerialization } from '../serializations/login.serialization';

export function LoginDocs(): MethodDecorator {
  return applyDecorators(
    Doc<LoginSerialization>(CAuthMessage.Success, {
      auth: {
        jwtAccessToken: false,
        apiKey: false,
      },
      response: {
        httpStatus: HttpStatus.OK,
        serialization: LoginSerialization,
      },
      request: {
        bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
      },
      requestHeader: {
        timestamp: true,
      },
    })
  );
}
