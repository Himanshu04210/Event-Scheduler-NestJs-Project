import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.local.env',
    }), 
    UsersModule, 
    TypeOrmModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get('HOST'),
      port: +configService.get('PORT'),
      username: configService.get('DATABASE_USERNAME'),
      password: configService.get('PASSWORD'),
      database: configService.get('DATABASE_NAME'),
      entities: [User],
      synchronize: true,
      logging: configService.get('LOGGING') === 'true' ? true : false,
      retryAttempts: 3,
    }),
    inject: [ConfigService],
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log("App module");
  }
}
