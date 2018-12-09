import { Module } from '@nestjs/common';

import { TypegooseModule } from 'nestjs-typegoose';

import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    ContactsModule,
    TypegooseModule.forRoot('mongodb://mongo:27017/contacts', {
      useNewUrlParser: true
    })
  ]
})
export class ApplicationModule {}
