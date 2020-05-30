import { CorsMiddleware } from '@nest-middlewares/cors';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { ResponseTimeMiddleware } from '@nest-middlewares/response-time';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { SharedModule } from '../shared/shared.module';
import { Contact } from './contact.model';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

@Module({
  controllers: [ContactsController],
  imports: [TypegooseModule.forFeature([Contact]), SharedModule],
  providers: [ContactsService]
})
export class ContactsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(CorsMiddleware, HelmetMiddleware, ResponseTimeMiddleware)
      .forRoutes('api/contacts');
  }
}
