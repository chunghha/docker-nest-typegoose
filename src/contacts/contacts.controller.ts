import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
  UseFilters
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Logger } from 'winston';

import { Contact } from './contact.model';
import { ContactsService } from './contacts.service';
import { ContactsExceptionFilter } from './exception/contacts-exception.filter';

@ApiTags('api')
@Controller()
@UseFilters(new ContactsExceptionFilter())
export class ContactsController {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    private readonly contactsService: ContactsService
  ) {}

  @ApiOperation({ summary: 'Return all contacts' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @Get('findAll')
  protected async getContacts(@Res() response): Promise<Contact[] | null> {
    this.logger.debug(`FindAll requested to get contacts.`);

    const res = await this.contactsService.findAll();
    if (res?.length > 0) {
      this.logger.info('FindAll responded with contacts.');
    }

    return response.status(HttpStatus.OK).json(res);
  }

  @ApiOperation({ summary: 'Return a contact per email requested' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiParam({ name: 'email', required: true, type: String })
  @Get('getContact/:email')
  protected async getContact(
    @Param('email') email,
    @Res() response
  ): Promise<Contact | null> {
    this.logger.info(`${email} requested to get a contact.`);

    const res = await this.contactsService.getContact(email);
    this.logger.info(res);

    return response.status(HttpStatus.OK).json(res);
  }

  @ApiOperation({ summary: 'Create a contact' })
  @ApiResponse({ status: 201, description: 'Successful response' })
  @Post('create')
  protected async create(
    @Body() contact: Contact,
    @Res() response
  ): Promise<Contact> {
    this.logger.info(`${contact.email} requested to be created.`);

    const res = await this.contactsService.create(contact);
    this.logger.info(res);

    return response.status(HttpStatus.CREATED).json(res);
  }
}
