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
import { HttpAdapterHost } from '@nestjs/core';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Logger } from 'winston';

import { Contact } from './contact.model';
import { ContactsService } from './contacts.service';
import { ContactsExceptionFilter } from './exception/contacts-exception.filter';

@ApiTags('api')
@Controller()
@UseFilters(ContactsExceptionFilter)
export class ContactsController {
  private readonly adapter;

  constructor(
    @Inject('winston') private readonly logger: Logger,
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly contactsService: ContactsService
  ) {
    this.adapter = this.httpAdapterHost.httpAdapter;
  }

  @ApiOperation({ summary: 'Return all contacts' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @Get('findAll')
  /* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
  protected async getContacts(@Res() response): Promise<Contact[] | null> {
    this.logger.debug(`FindAll requested to get contacts.`);

    const res = await this.contactsService.findAll();
    if (res?.length > 0) {
      this.logger.info('FindAll responded with contacts.');
    }

    return this.adapter.reply(response, res, HttpStatus.OK);
  }

  @ApiOperation({ summary: 'Return a contact per email requested' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiParam({
    name: 'email',
    required: true,
    type: String,
    example: 'jane.kim@gmail.com'
  })
  @Get('getContact/:email')
  /* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
  protected async getContact(
    @Param('email') email: string,
    @Res() response
  ): Promise<Contact | null> {
    this.logger.info(`${email} requested to get a contact.`);

    const res = await this.contactsService.getContact(email);
    this.logger.info(res);

    return this.adapter.reply(response, res, HttpStatus.OK);
  }

  @ApiOperation({ summary: 'Create a contact' })
  @ApiResponse({ status: 201, description: 'Successful response' })
  @Post('create')
  /* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
  protected async create(
    @Body() contact: Contact,
    @Res() response
  ): Promise<Contact> {
    this.logger.info(`${contact.email} requested to be created.`);

    const res = await this.contactsService.create(contact);
    this.logger.info(res);

    return this.adapter.reply(response, res, HttpStatus.OK);
  }
}
