import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { SHA256, enc } from 'crypto-js';
import { IHelperHashService } from 'src/common/helper/interfaces/helper.hash-service.interface';
import crypto from 'crypto';
@Injectable()
export class HelperHashService implements IHelperHashService {
    randomSalt(length: number): string {
        return genSaltSync(length);
    }

    bcrypt(passwordString: string, salt: string): string {
        return hashSync(passwordString, salt);
    }

    bcryptCompare(passwordString: string, passwordHashed: string): boolean {
        return compareSync(passwordString, passwordHashed);
    }

    sha256(string: string): string {
        return SHA256(string).toString(enc.Hex);
    }

    sha256Compare(hashOne: string, hashTwo: string): boolean {
        return hashOne === hashTwo;
    }

    pbkdf2SyncPasswordMatch(password, salt, passwordHash): boolean {
        return passwordHash === crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('base64');
    }

}
