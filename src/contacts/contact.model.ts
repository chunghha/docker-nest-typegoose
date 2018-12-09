import { IsString } from 'class-validator';
import { prop, Typegoose } from 'typegoose';

export class Contact extends Typegoose {
  @IsString()
  @prop({ required: true })
  public name: string;

  @IsString()
  @prop({ required: false })
  public group: string;

  @IsString()
  @prop({ required: true })
  public email: string;

  @IsString()
  @prop({ required: false })
  public phone: string;
}
