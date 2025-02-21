import { ConfigService } from '@nestjs/config';

export class Envs {
  private static configService: ConfigService;

  static initialize(configService: ConfigService) {
    Envs.configService = configService;
  }

  static get HOST_BD(): string {
    const a = Envs.configService.get<string>('HOST_BD')!;
    console.log(a);
    return a;
  }

  static get USER_BD(): string {
    return Envs.configService.get<string>('USER_BD')!;
  }

  static get BD_PASS(): string {
    return Envs.configService.get<string>('BD_PASS')!;
  }

  static get BD_PORT(): string {
    return Envs.configService.get<string>('BD_PORT')!;
  }
}
