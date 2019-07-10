import { Module } from '@nestjs/common';

import { TypegooseModule } from 'nestjs-typegoose';

import { Contact } from './contact.model';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

@Module({
  controllers: [ContactsController],
  imports: [TypegooseModule.forFeature([Contact])],
  providers: [ContactsService]
})
export class ContactsModule {}
