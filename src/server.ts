import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as pj from 'pjson';

import { ApplicationModule } from './app.module';

class Server {
  async bootstrap(): Promise<void> {
    const API_PORT = 3100;
    const app = await NestFactory.create(ApplicationModule);
    await this.setSwaggerModule(app, API_PORT);
    await app.listen(API_PORT);
  }

  private async setSwaggerModule(app, port): Promise<void> {
    const version = pj.version;

    const options = new DocumentBuilder()
      .setTitle('Contacts REST API')
      .setDescription('Contacts REST API with MongoDB backend')
      .setVersion(version)
      .addServer(`http://localhost:${port}`)
      .addTag('contacts')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api/swagger', app, document);
  }
}

const server = new Server();
server.bootstrap();
