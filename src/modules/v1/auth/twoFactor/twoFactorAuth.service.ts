import { Injectable, Logger } from '@nestjs/common';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
import User from '../../users/schemas/user.entity';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TwoFactorAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}
  private readonly logger = new Logger(TwoFactorAuthService.name);

  public async generateTwoFactorAuthSecret(user: User) {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(
      user.email,
      this.configService.get('TWO_FACTOR_AUTH_APP_NAME'),
      secret,
    );

    await this.usersService.setTwoFactorSecret(secret, user.id);

    return {
      secret,
      otpauthUrl,
    };
  }

  public isTwoFactorAuthCodeValid(twoFactorCode: string, user: User) {
    return authenticator.verify({
      token: twoFactorCode,
      secret: user.twoFactorSecret,
    });
  }

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }
}
