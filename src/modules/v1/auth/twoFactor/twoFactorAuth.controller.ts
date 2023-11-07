import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  Res,
  Logger,
  UseGuards,
  Req,
  Body,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TwoFactorAuthService } from './twoFactorAuth.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import { UsersService } from '../../users/users.service';
import { TwoFactorAuthCodeDto } from './dto/twoFactorAuthCode.dto';
import { AuthService } from '../auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('two-factor')
@ApiTags('Two Factors')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthController {
  constructor(
    private readonly twoFactorAuthService: TwoFactorAuthService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  private readonly logger = new Logger(TwoFactorAuthController.name);

  @Post('generate')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async register(@Res() response: Response, @Req() request: RequestWithUser) {
    this.logger.log(`Registration requested: ${request.user.username}`);
    const { otpauthUrl } =
      await this.twoFactorAuthService.generateTwoFactorAuthSecret(request.user);

    return this.twoFactorAuthService.pipeQrCodeStream(response, otpauthUrl);
  }

  @Post('activate')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiBody({ type: TwoFactorAuthCodeDto })
  @UseGuards(JwtAuthGuard)
  async turnOnTwoFactorAuthentication(
    @Req() request: RequestWithUser,
    @Body() { twoFactorCode }: TwoFactorAuthCodeDto,
  ) {
    this.logger.log(`Request user with id: ${twoFactorCode}`);
    const isCodeValid = this.twoFactorAuthService.isTwoFactorAuthCodeValid(
      twoFactorCode,
      request.user,
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.usersService.turnOnTwoFactorAuth(request.user.id);
  }

  @Post('authenticate')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: TwoFactorAuthCodeDto })
  @UseGuards(JwtAuthGuard)
  async authenticate(
    @Req() request: RequestWithUser,
    @Body() { twoFactorCode }: TwoFactorAuthCodeDto,
  ) {
    const isCodeValid = this.twoFactorAuthService.isTwoFactorAuthCodeValid(
      twoFactorCode,
      request.user,
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      request.user.id,
      true,
    );

    request.res.setHeader('Set-Cookie', [accessTokenCookie]);

    return {
      id: request.user.id,
      username: request.user.username,
      email: request.user.email,
      verified: request.user.verified,
      name: request.user.name,
      surname: request.user.surname,
      internal: request.user.internal,
      twoFactorEnabled: request.user.twoFactorEnabled,
    };
  }
}
