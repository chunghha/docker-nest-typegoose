import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from 'nest-router';

import { ContactsModule } from './contacts/contacts.module';
import { routes } from './routes';
import { ConfigService } from './shared/config.service';
import { registerWinston } from './shared/function/register-winston';

const DB_URI = new ConfigService(
  `./env/${process.env.NODE_ENV ? process.env.NODE_ENV : 'local'}.env`
).getDbUri();

@Module({
  imports: [
    registerWinston(),
    ContactsModule,
    RouterModule.forRoutes(routes),
    MongooseModule.forRoot(DB_URI)
  ]
})
export class ApplicationModule {}
