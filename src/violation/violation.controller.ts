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

@Controller('violation')
export class ViolationController {
  constructor(private violationService: ViolationService) {}

  @Post('/create')
  createUser(@Body() body: any) {
    this.violationService.create(
      body.civilId,
      body.alcoholicLevel,
      body.transportationMean,
      body.fineAmount,
      body.status,
      body.created,
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
  updateUser(@Param('id') id: string, @Body() body: any) {
    return this.violationService.update(parseInt(id), body);
  }
}
