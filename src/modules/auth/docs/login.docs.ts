import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ENUM_DOC_REQUEST_BODY_TYPE } from 'src/common/doc/constants/doc.enum.constant';
import { Doc } from 'src/common/doc/decorators/doc.decorator';

import { CAuthMessage } from '../constants/auth.constant';
import { AppHelloSerialization } from '../serializations/app.hello.serialization';

export function LoginDocs(): MethodDecorator {
  return applyDecorators(
    Doc<AppHelloSerialization>(CAuthMessage.Success, {
      auth: {
        jwtAccessToken: false,
        apiKey: true,
      },
      response: {
        httpStatus: HttpStatus.OK,
        serialization: AppHelloSerialization,
      },
      request: {
        bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
      },
    })
  );
}
