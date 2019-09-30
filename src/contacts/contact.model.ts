import { ApiModelProperty } from '@nestjs/swagger';

import { index, prop, Typegoose } from '@hasezoey/typegoose';
import { IsString } from 'class-validator';

@index({ email: 1 }, { unique: true })
export class Contact extends Typegoose {
  @ApiModelProperty({ required: true, example: 'JJ Joyce' })
  @IsString()
  @prop({ required: true })
  public name: string;

  @ApiModelProperty({ required: false, example: 'work' })
  @IsString()
  @prop({ required: false })
  public group: string;

  @ApiModelProperty({ required: true, example: 'jj.joyce@mail.com' })
  @IsString()
  @prop({ required: true })
  public email: string;

  @ApiModelProperty({ required: false, example: '555-555-5555' })
  @IsString()
  @prop({ required: false })
  public phone: string;
}
