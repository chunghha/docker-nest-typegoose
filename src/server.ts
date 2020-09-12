import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as pj from 'pjson';

import { ApplicationModule } from './app.module';
import { ValidationPipe } from './shared/pipes/validation.pipe';

class Server {
  async bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(ApplicationModule);
    app.useGlobalPipes(new ValidationPipe());

    const API_PORT = process.env.API_PORT;
    await this.setSwaggerModule(app, API_PORT);
    await app.listen(+API_PORT, '0.0.0.0');
  }

  private async setSwaggerModule(app, port): Promise<void> {
    const version = pj.version;

    const options = new DocumentBuilder()
      .setTitle('Contacts REST API')
      .setDescription('Contacts REST API with MongoDB backend')
      .setVersion(version)
      .addServer(`http://localhost:${port}`)
      .addTag('api')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api/swagger', app, document);
  }
}

const server = new Server();
server.bootstrap();
