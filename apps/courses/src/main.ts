import { NestFactory } from '@nestjs/core';
import { CoursesModule } from './courses.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const PORT = +process.env.COURSES_MS_PORT!;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CoursesModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'courses',
        port: PORT,
      },
    },
  );
  console.log(`Microservice courses running on port ${PORT}`);
  await app.listen();
}
bootstrap();
