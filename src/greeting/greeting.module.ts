import { Module } from 'src/nestjs-copycat/common';
import { GreetingController } from './greeting.controller';
import { GreetingService } from './greeting.service';

@Module({
  imports: [],
  controllers: [GreetingController],
  providers: [GreetingService],
})
export class GreetingModule {}