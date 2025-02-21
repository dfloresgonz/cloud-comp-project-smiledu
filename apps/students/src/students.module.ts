import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HOST_BD: Joi.string().required(),
        USER_BD: Joi.string().required(),
        BD_PASS: Joi.string().required(),
        BD_PORT: Joi.string().required(),
      }),
      envFilePath: '.env',
    }),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
