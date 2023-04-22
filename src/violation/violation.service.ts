import { Injectable } from '@nestjs/common';
import { ViolationEntity } from './database/entities/violation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ViolationService {
  constructor(
    @InjectRepository(ViolationEntity)
    private repo: Repository<ViolationEntity>,
  ) {}

  create(
    civilId: string,
    alcoholicLevel: number,
    transportationMean: number,
    fineAmount: number,
    status: string,
    created: string,
  ) {
    const violation = this.repo.create({
      civilId,
      alcoholicLevel,
      transportationMean,
      fineAmount,
      status,
      created,
    });
    return this.repo.save(violation);
  }

  find() {
    return this.repo.find();
  }

  findOne(civilId: string) {
    return this.repo.findOne({ where: { civilId } });
  }

  async update(id: number, attrs: Partial<ViolationEntity>) {
    const violation = await this.repo.findOne({ where: { id: id } });
    if (!violation) {
      throw new Error('violation not found');
    }
    Object.assign(violation, attrs);
    return this.repo.save(violation);
  }

  async remove(id: number) {
    const violation = await this.repo.findOne({ where: { id: id } });
    if (!violation) {
      throw new Error('violation not found');
    }
    return this.repo.remove(violation);
  }
}
