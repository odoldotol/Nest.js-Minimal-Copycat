import { Module } from "src/nestjs-copycat/common";
import { GoodbyeService } from "./goodbye.service";

@Module({
  imports: [],
  controllers: [],
  providers: [GoodbyeService],
  exports: [GoodbyeService],
})
export class GoodbyeModule {}