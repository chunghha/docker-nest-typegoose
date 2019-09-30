import { Injectable } from '@nestjs/common';

import { ModelType } from '@hasezoey/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { Contact } from './contact.model';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact) private readonly contactModel: ModelType<Contact>
  ) {}

  public async create(createContactDto: Contact): Promise<Contact> {
    const createdContact = new this.contactModel(createContactDto);

    return createdContact.save();
  }

  public async findAll(): Promise<Contact[] | null> {
    return this.contactModel.find().exec();
  }

  public async getContact(email: string): Promise<Contact | null> {
    return this.contactModel.findOne({ email }).exec();
  }
}
