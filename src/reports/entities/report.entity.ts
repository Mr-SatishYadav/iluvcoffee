import { User } from '@app/users/entities/user.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: false})
  approved: boolean;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @Column()
  price: number;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.reports, { eager: true })
  user: User;

  @BeforeInsert()
  updateTimestamps() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @BeforeUpdate()
  updateUpdateTimestamp() {
    this.updated_at = new Date();
  }

  @AfterInsert()
  logInsert() {
    console.log('Report has been inserted');
    console.table({
      id: this.id,
      created_at: this.created_at.toLocaleString(),
      make: this.make,
      model: this.model,
      year: this.year,
      user: this.user.id,
    });
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Report has been updated');
    console.table({
      id: this.id,
      updated_at: this.updated_at.toLocaleString(),
      make: this.make,
      model: this.model,
      year: this.year,
      user: this.user.id,
    });
  }
  @AfterRemove()
  logRemove() {
    console.log('Report has been removed');
    console.table({
      updated_at: this.updated_at.toLocaleString(),
      make: this.make,
      model: this.model,
      year: this.year,
      user: this.user.id,
    });
  }
}
