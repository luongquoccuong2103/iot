import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViolationModule } from './violation/violation.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/database/entities/user.entity';
import { ViolationEntity } from './violation/database/entities/violation.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'path/to/db.sqlite',
      entities: [UserEntity, ViolationEntity],
      synchronize: true,
    }),
    ViolationModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
