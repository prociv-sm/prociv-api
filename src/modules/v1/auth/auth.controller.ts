import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req) {
    this.logger.log(`Find user with username: ${req.body.username}`);
    const token = await this.authService.login(req.user);
    return {
      access_token: token.access_token,
      user: {
        username: req.user.username,
        email: req.user.email,
        name: req.user.name,
        surname: req.user.surname,
        internal: req.user.internal,
        verified: req.user.verified,
        id: req.user.id,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
