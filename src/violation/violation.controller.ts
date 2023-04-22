import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ViolationService } from './violation.service';
import { NotificationService } from './notifications.service';

@Controller('violation')
export class ViolationController {
  constructor(
    private violationService: ViolationService,
    private notificationService: NotificationService,
  ) {}

  @Post('/create')
  async createViolation(@Body() body: any) {
    await this.violationService.create(
      body.civilId,
      body.alcoholicLevel,
      body.transportationMean,
      body.fineAmount,
      body.status,
      body.created,
    );
    const createdDate = new Date(body.created);
    const dueDate = new Date(createdDate.getTime() + (15 * 24 * 60 * 60 * 1000));

    await this.notificationService.createNotification(
      body.civilId,
      body.transportationMean,
      dueDate.toISOString().split("T")[0],
    );
  }

  @Post('/findOne')
  findUser(@Body() civilId: string) {
    return this.violationService.findOne(civilId);
  }

  @Get('/getAllViolation')
  findAllUsers() {
    return this.violationService.find();
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.violationService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateViolation(@Param('id') id: string, @Body() body: any) {
    return this.violationService.update(parseInt(id), body);
  }
}
