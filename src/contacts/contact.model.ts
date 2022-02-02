import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
  @IsString()
  @Prop({ required: true })
  @ApiProperty({ required: true, example: 'JJ Joyce' })
  readonly name: string;

  @IsOptional()
  @IsString()
  @Prop({ required: false })
  @ApiProperty({ required: false, example: 'work' })
  readonly group: string;

  @IsEmail()
  @Prop({ required: true, unique: true, type: String })
  @ApiProperty({ required: true, example: 'jj.joyce@mail.com' })
  readonly email: string;

  @IsOptional()
  @IsString()
  @Prop({ required: false })
  @ApiProperty({ required: false, example: '555-555-5555' })
  readonly phone: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
