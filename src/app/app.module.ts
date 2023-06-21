import { Module } from 'src/nestjs-copycat/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GreetingModule } from 'src/greeting/greeting.module';
import { GoodbyeModule } from 'src/goodbye/goodbye.module';

@Module({
  imports: [
    GreetingModule,
    GoodbyeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
