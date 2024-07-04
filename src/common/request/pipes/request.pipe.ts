import { HttpStatus, ValidationPipe } from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      skipNullProperties: false,
      skipUndefinedProperties: false,
      skipMissingProperties: false,
      forbidUnknownValues: false,
    });
    this.errorHttpStatusCode = HttpStatus.UNPROCESSABLE_ENTITY;
    this.isTransformEnabled = true;
  }
}
