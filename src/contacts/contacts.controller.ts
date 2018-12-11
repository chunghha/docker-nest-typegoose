import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiImplicitParam,
  ApiOperation,
  ApiResponse,
  ApiUseTags
} from '@nestjs/swagger';

import { Contact } from './contact.model';
import { ContactsService } from './contacts.service';

@ApiUseTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @ApiOperation({ title: 'Return all contacts' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @Get()
  protected async getContacts(): Promise<Contact[] | null> {
    return this.contactsService.findAll();
  }

  @ApiOperation({ title: 'Return a contact per email requested' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiImplicitParam({ name: 'email', required: true, type: String })
  @Get(':email')
  protected async getContact(@Param('email') email): Promise<Contact | null> {
    return this.contactsService.getContact(email);
  }

  @ApiOperation({ title: 'Create a contact' })
  @ApiResponse({ status: 201, description: 'Successful response' })
  @Post()
  protected async create(@Body() contact: Contact): Promise<Contact> {
    return this.contactsService.create(contact);
  }
}
