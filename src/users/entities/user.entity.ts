import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { Report } from '../../reports/entities/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ default: false })
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

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
    console.log('User has been inserted');
    console.table({
      id: this.id,
      created_at: this.created_at.toLocaleString(),
      email: this.email,
    });
  }
  @AfterUpdate()
  logUpdate() {
    console.log('User has been updated');
    console.table({
      id: this.id,
      updated_at: this.updated_at.toLocaleString(),
      email: this.email,
    });
  }
  @AfterRemove()
  logRemove() {
    console.log('User has been removed');
    console.table({
      updated_at: this.updated_at.toLocaleString(),
      email: this.email,
    });
  }
}
