import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ENUM_DOC_REQUEST_BODY_TYPE } from 'src/common/doc/constants/doc.enum.constant';
import { Doc } from 'src/common/doc/decorators/doc.decorator';
import { CAuthMessage } from '../constants/auth.constant';
import { RefreshSerialization } from '../serializations/refresh.serialization';

export function RefreshDocs(): MethodDecorator {
  return applyDecorators(
    Doc<RefreshSerialization>(CAuthMessage.Success, {
      auth: {
        jwtAccessToken: false,
        apiKey: false,
        jwtRefreshToken: true,
      },
      response: {
        httpStatus: HttpStatus.OK,
        serialization: RefreshSerialization,
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
