import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  getDbUri(): string {
    return String(this.envConfig.DB_URI);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envSchema: Joi.ObjectSchema = Joi.object({
      DB_URI: Joi.string().required()
    });

    const { error, value: validatedEnvConfig } = envSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
