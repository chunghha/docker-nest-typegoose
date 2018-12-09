import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { Contact } from './contact.model';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  protected async getContacts(): Promise<Contact[] | null> {
    return this.contactsService.findAll();
  }

  @Get(':email')
  protected async getContact(@Param('email') email): Promise<Contact | null> {
    return this.contactsService.getContact(email);
  }

  @Post()
  protected async create(@Body() contact: Contact): Promise<Contact> {
    return this.contactsService.create(contact);
  }
}
