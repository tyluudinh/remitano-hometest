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
import { UserAuthDto } from './dtos/user-auth.dto';
import { AuthService } from './auth/auth.service';
import { User } from '@remitano-hometest/types';
import { JwtAuthGuard } from './auth/auth.guard';

@Controller('users')
export class UserController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('auth')
  @UseInterceptors(ClassSerializerInterceptor)
  private register(@Body() body: UserAuthDto): Promise<User | never> {
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
