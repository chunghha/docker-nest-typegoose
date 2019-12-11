import { Module } from '@nestjs/common';

import { TypegooseModule } from 'nestjs-typegoose';

import { ContactsModule } from './contacts/contacts.module';
import { ConfigService } from './shared/config.service';

const DB_URI = new ConfigService(
  `./env/${process.env.NODE_ENV ? process.env.NODE_ENV : 'local'}.env`
).getDbUri();

@Module({
  imports: [
    ContactsModule,
    TypegooseModule.forRoot(DB_URI, {
      useNewUrlParser: true
    })
  ]
})
export class ApplicationModule {}
