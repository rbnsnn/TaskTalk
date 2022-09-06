import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }),
  MongooseModule.forRoot(process.env.DATABASE),
    UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useClass: ValidationPipe
  }]
})
export class AppModule { }
