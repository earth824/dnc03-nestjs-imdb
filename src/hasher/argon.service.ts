import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class ArgonService {
  hash(plain: string): Promise<string> {
    return argon.hash(plain);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return argon.verify(hash, plain);
  }
}
