import { NestFactory } from '@nestjs/core';
import { StudentsModule } from './students.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const PORT = +process.env.STUDENTS_MS_PORT!;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    StudentsModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: PORT,
      },
    },
  );
  console.log(`Microservice students running on port ${PORT}`);
  await app.listen();
}
bootstrap();
