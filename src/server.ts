import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ApplicationModule } from './app.module';

class Server {
  public async bootstrap(): Promise<void> {
    const app = await NestFactory.create(ApplicationModule);
    await this.setSwaggerModule(app);
    await app.listen(3100);
  }

  private async setSwaggerModule(app): Promise<void> {
    const options = new DocumentBuilder()
      .setTitle('Contacts REST API')
      .setDescription('Contacts REST API with MongoDB backend')
      .setVersion('0.0.1')
      .addTag('contacts')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }
}

const server = new Server();
server.bootstrap();
