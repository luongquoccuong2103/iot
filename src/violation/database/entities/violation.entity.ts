import { AlcoholicLevelEnum } from 'src/generic/alcoholicLevel.enum';
import { StatusEnum } from 'src/generic/status.enum';
import { TransportationEnum } from 'src/generic/transportingMean.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ViolationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 12 })
  civilId: string;

  @Column({ default: AlcoholicLevelEnum.ZERO })
  alcoholicLevel: number;

  @Column({ default: TransportationEnum.UNDEFINED })
  transportationMean: number;

  @Column({ default: 0 })
  fineAmount: number;

  @Column({ default: StatusEnum.PENDING })
  status: string;

  @Column({ nullable: true })
  created?: string;
}
