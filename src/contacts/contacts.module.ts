import { CorsMiddleware } from '@nest-middlewares/cors';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { ResponseTimeMiddleware } from '@nest-middlewares/response-time';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SharedModule } from '../shared/shared.module';
import { Contact, ContactSchema } from './contact.model';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

@Module({
  controllers: [ContactsController],
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
    SharedModule
  ],
  providers: [ContactsService]
})
export class ContactsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(CorsMiddleware, HelmetMiddleware, ResponseTimeMiddleware)
      .forRoutes('api');
  }
}
