import { Module } from 'src/nestjs_copycat/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GreetingModule } from 'src/greeting/greeting.module';

@Module({
  imports: [GreetingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
