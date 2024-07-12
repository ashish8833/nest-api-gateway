import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ENUM_DOC_REQUEST_BODY_TYPE } from 'src/common/doc/constants/doc.enum.constant';
import { Doc } from 'src/common/doc/decorators/doc.decorator';
import { CAuthMessage } from '../constants/auth.constant';
import { MeSerialization } from '../serializations/me.serialization';

export function MeDocs(): MethodDecorator {
  return applyDecorators(
    Doc<MeSerialization>(CAuthMessage.Success, {
      auth: {
        jwtAccessToken: true,
        apiKey: false,
        jwtRefreshToken: false,
      },
      response: {
        httpStatus: HttpStatus.OK,
        serialization: MeSerialization,
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
