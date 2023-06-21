import { Module } from 'src/nestjs-copycat/common';
import { GreetingController } from './greeting.controller';
import { GreetingService } from './greeting.service';
import { GoodbyeModule } from 'src/goodbye/goodbye.module';

@Module({
  imports: [GoodbyeModule],
  controllers: [GreetingController],
  providers: [GreetingService],
  exports: [GreetingService],
})
export class GreetingModule {}