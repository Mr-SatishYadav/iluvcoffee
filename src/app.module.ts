import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GymModule } from './gym/gym.module';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'skyadav',
      password: 'p@ss_word2T',
      database: 'pglocaldb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    GymModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
