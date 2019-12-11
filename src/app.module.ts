import { Module } from '@nestjs/common';

import { RouterModule } from 'nest-router';
import { WinstonModule } from 'nest-winston';
import { TypegooseModule } from 'nestjs-typegoose';

import { ContactsModule } from './contacts/contacts.module';
import { routes } from './routes';
import { ConfigService } from './shared/config.service';

const DB_URI = new ConfigService(
  `./env/${process.env.NODE_ENV ? process.env.NODE_ENV : 'local'}.env`
).getDbUri();

/* tslint:disable */
const winston = require('winston');
winston.transports.DailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs');
const logDir = 'log';
/* tslint:enable */

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  datePattern: 'YYYY-MM-DD',
  filename: `${logDir}/nest-typegoose-api-%DATE%.log`,
  maxFiles: '7d'
});

@Module({
  imports: [
    ContactsModule,
    RouterModule.forRoutes(routes),
    TypegooseModule.forRoot(DB_URI, {
      useNewUrlParser: true
    }),
    WinstonModule.forRootAsync({
      inject: [],
      useFactory: () => ({
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'MM/DD/YYYY HH:mm:ss.SSS'
          }),
          winston.format.json()
        ),
        level: 'info',
        transports: [
          new winston.transports.Console({ level: 'debug' }),
          dailyRotateFileTransport
        ]
      })
    })
  ]
})
export class ApplicationModule {}
