import {
  Body,
  Controller,
  Inject,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from '@remitano-hometest/types';
import { AuthService } from './auth.service';
import { UserAuthDto } from './auth.dto';
import { JwtAuthGuard } from './auth.guard';

@Controller('users')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('auth')
  @UseInterceptors(ClassSerializerInterceptor)
  private auth(@Body() body: UserAuthDto): Promise<User | never> {
    return this.service.auth(body);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  private refresh(
    @Req() { user }: Request & { user: User }
  ): Promise<string | never> {
    return this.service.refresh(<User>user);
  }
}
