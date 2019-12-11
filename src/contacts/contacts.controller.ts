import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Contact } from './contact.model';
import { ContactsService } from './contacts.service';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @ApiOperation({ summary: 'Return all contacts' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @Get()
  protected async getContacts(): Promise<Contact[] | null> {
    return this.contactsService.findAll();
  }

  @ApiOperation({ summary: 'Return a contact per email requested' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiParam({ name: 'email', required: true, type: String })
  @Get(':email')
  protected async getContact(@Param('email') email): Promise<Contact | null> {
    return this.contactsService.getContact(email);
  }

  @ApiOperation({ summary: 'Create a contact' })
  @ApiResponse({ status: 201, description: 'Successful response' })
  @Post()
  protected async create(@Body() contact: Contact): Promise<Contact> {
    return this.contactsService.create(contact);
  }
}
