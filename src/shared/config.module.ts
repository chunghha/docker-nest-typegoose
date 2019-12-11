import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  exports: [ConfigService],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        `./env/${process.env.NODE_ENV ? process.env.NODE_ENV : 'local'}.env`
      )
    }
  ]
})
export class ConfigModule {}
