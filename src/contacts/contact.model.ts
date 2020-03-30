import { ApiProperty } from '@nestjs/swagger';
import { index, prop } from '@typegoose/typegoose';
import { IsEmail, IsOptional, IsString } from 'class-validator';

@index({ email: 1 }, { unique: true })
export class Contact {
  @IsString()
  @prop({ required: true })
  @ApiProperty({ required: true, example: 'JJ Joyce' })
  readonly name: string;

  @IsOptional()
  @IsString()
  @prop({ required: false })
  @ApiProperty({ required: false, example: 'work' })
  readonly group: string;

  @IsEmail()
  @prop({ required: true })
  @ApiProperty({ required: true, example: 'jj.joyce@mail.com' })
  readonly email: string;

  @IsOptional()
  @IsString()
  @prop({ required: false })
  @ApiProperty({ required: false, example: '555-555-5555' })
  readonly phone: string;
}
