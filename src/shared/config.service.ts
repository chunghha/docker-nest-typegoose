import * as fs from 'fs';

import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
    /* eslint-disable-next-line no-console */
    console.log(`Runtime Environment: ${this.getRuntimeEnv()}`);
  }

  getDbUri(): string {
    return String(this.envConfig.DB_URI);
  }

  getRuntimeEnv(): string {
    return String(this.envConfig.RUNTIME_ENV);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envSchema: Joi.ObjectSchema = Joi.object({
      DB_URI: Joi.string().required(),
      RUNTIME_ENV: Joi.string()
        .required()
        .valid('local', 'dev', 'qa', 'prod')
        .default('local')
    });

    const { error, value: validatedEnvConfig } = envSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
