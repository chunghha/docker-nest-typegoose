import { Module } from '@nestjs/common';

import { TypegooseModule } from 'nestjs-typegoose';

import { ContactsModule } from './contacts/contacts.module';
import { DB_URI } from './utils/config';

@Module({
  imports: [
    ContactsModule,
    TypegooseModule.forRoot(DB_URI, {
      useNewUrlParser: true
    })
  ]
})
export class ApplicationModule {}
