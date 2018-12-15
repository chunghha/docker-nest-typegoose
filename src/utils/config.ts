import * as dotenv from 'dotenv';

dotenv.config();
let path: string;
switch (process.env.NODE_ENV) {
  case 'dev':
    path = `${__dirname}/../../.env.dev`;
    break;
  case 'qa':
    path = `${__dirname}/../../.env.qa`;
    break;
  case 'prod':
    path = `${__dirname}/../../.env.prod`;
    break;
  default:
    path = `${__dirname}/../../.env`;
}
dotenv.config({ path });

export const DB_URI = process.env.DB_URI;
