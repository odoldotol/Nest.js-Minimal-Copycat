// import { Module } from 'src/nestjs_copycat/common';
import { Module } from 'src/nestjs/packages/common';
import { GreetingController } from './greeting.controller';
import { GreetingService } from './greeting.service';

@Module({
  imports: [],
  controllers: [GreetingController],
  providers: [GreetingService],
})
export class GreetingModule {}