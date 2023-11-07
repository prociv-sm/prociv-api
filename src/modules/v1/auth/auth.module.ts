import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { TwoFactorAuthService } from './twoFactor/twoFactorAuth.service';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';
import { JwtTwoFactorStrategy } from './strategies/jwt-two-factor.strategy';
import { TwoFactorAuthController } from './twoFactor/twoFactorAuth.controller';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({})],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    JwtTwoFactorStrategy,
    TwoFactorAuthService,
  ],
  controllers: [AuthController, TwoFactorAuthController],
  exports: [AuthService],
})
export class AuthModule {}
