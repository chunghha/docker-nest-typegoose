import { Module } from '@nestjs/common';

import { RouterModule } from 'nest-router';
import { TypegooseModule } from 'nestjs-typegoose';

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
    TypegooseModule.forRoot(DB_URI, {
      useNewUrlParser: true
    })
  ]
})
export class ApplicationModule {}
