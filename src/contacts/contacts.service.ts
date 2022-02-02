import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';

import { Contact } from './contact.model';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel('Contact')
    private readonly contactModel: ReturnModelType<typeof Contact>
  ) {}

  async create(createContactDto: Contact): Promise<Contact> {
    const createdContact = new this.contactModel(createContactDto);

    return createdContact.save();
  }

  async findAll(): Promise<Contact[] | null> {
    return this.contactModel.find().exec();
  }

  async getContact(email: string): Promise<Contact | null> {
    return this.contactModel.findOne({ email }).exec();
  }
}
