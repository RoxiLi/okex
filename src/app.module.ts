import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AuthenticationModule} from "src/utils/authentication/authentication.module";
import { ConfigModule } from '@nestjs/config';
import {LoggerModule} from "src/utils/logger/logger.module";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    AuthenticationModule,
    LoggerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
