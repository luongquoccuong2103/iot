import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post('/create')
  createUser(@Body() body: any) {
    this.usersService.create(body.civilId, body.name, body.hometown, body.lastUpdated);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get()
  findAllUsers(@Body('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: any) {
    return this.usersService.update(parseInt(id), body);
  }
}
