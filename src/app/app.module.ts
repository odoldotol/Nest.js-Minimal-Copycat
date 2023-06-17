// import { Module } from 'src/nestjs_copycat/common';
import { Module } from 'src/nestjs/packages/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
