import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/module/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'authen_nestjs',
      port: 3306,
      entities: [User],
      autoLoadEntities: true,
      username: 'root',
      host: 'localhost',
      synchronize: true,
      password: '22121944',
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
