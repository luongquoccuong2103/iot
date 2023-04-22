import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './database/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  create(civilId: string, name: string, hometown: string, lastUpdated: string) {
    const user = this.repo.create({ civilId, name, hometown, lastUpdated });
    return this.repo.save(user);
  }

  find(name: string) {
    return this.repo.find({ where: { name: name } });
  }

  findOne(civilId: string) {
    return this.repo.findOne({ where: { civilId: civilId } });
  }

  async update(id: number, attrs: Partial<UserEntity>) {
    const user = await this.repo.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('user not found');
    }
    return this.repo.remove(user);
  }
}
