import { Module } from '@nestjs/common';
import { ViolationController } from './violation.controller';
import { ViolationService } from './violation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViolationEntity } from './database/entities/violation.entity';
import { UserEntity } from 'src/user/database/entities/user.entity';
import { NotificationService } from './notifications.service';

@Module({
  imports: [TypeOrmModule.forFeature([ViolationEntity]), TypeOrmModule.forFeature([UserEntity])],
  controllers: [ViolationController],
  providers: [ViolationService, NotificationService],
})
export class ViolationModule {}
