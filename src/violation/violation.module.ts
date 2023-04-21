import { Module } from '@nestjs/common';
import { ViolationController } from './violation.controller';
import { ViolationService } from './violation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViolationEntity } from './database/entities/violation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ViolationEntity])],
  controllers: [ViolationController],
  providers: [ViolationService],
})
export class ViolationModule {}
