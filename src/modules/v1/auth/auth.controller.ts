import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { UsersService } from '../users/users.service';
import { RegistrationDto } from './dto/registration.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  private readonly logger = new Logger(AuthController.name);

  @Post('register')
  @ApiBody({ type: RegistrationDto })
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registrationData: RegistrationDto) {
    const checkUsers = await this.usersService.findByUsername(
      registrationData.username,
    );
    if (checkUsers) {
      throw new ConflictException('Username already exists');
    }

    const user = await this.authService.register(registrationData);
    /*  await this.emailConfirmationService.sendVerificationLink(
      registrationData.email,
    );*/
    return {
      id: user.id,
      username: user.username,
    };
  }

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    this.logger.log(`Login requested by user: ${user.id}`);
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(user.id);
    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    if (user.twoFactorEnabled) {
      return {
        twoFactorEnabled: user.twoFactorEnabled,
      };
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      verified: user.verified,
      name: user.name,
      surname: user.surname,
      internal: user.internal,
      twoFactorEnabled: user.twoFactorEnabled,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Req() request: RequestWithUser) {
    this.logger.log(`Logout requested by user: ${request.user.id}`);
    await this.usersService.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogout());
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    this.logger.log(`Authenticate requested by user: ${request.user.id}`);
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

  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    this.logger.log(`Refresh requested by user: ${request.user.id}`);
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      request.user.id,
    );

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return {
      id: request.user.id,
      username: request.user.username,
      email: request.user.email,
      internal: request.user.internal,
    };
  }
}
