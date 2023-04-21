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
      body.name,
      body.alcoholicLevel,
      body.transportationMean,
      body.fineAmount,
      body.status,
      body.created,
    );
  }

  @Get('/:id')
  findUser(@Param('name') name: string) {
    return this.violationService.findOne(name);
  }

  @Get()
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
