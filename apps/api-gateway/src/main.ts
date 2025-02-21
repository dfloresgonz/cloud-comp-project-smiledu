import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CoursesModule } from './courses/courses.module';
import { StudentModule } from './student/student.module';

async function bootstrap() {
  const API_PORT = +process.env.API_PORT!;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();

  const studentsConfig = new DocumentBuilder()
    .setTitle('Students API')
    .setDescription('API for managing students')
    .setVersion('1.0')
    .addTag('students')
    .build();

  const studentDocument = SwaggerModule.createDocument(app, studentsConfig, {
    include: [StudentModule],
  });

  SwaggerModule.setup('api/students', app, studentDocument);

  const coursesConfig = new DocumentBuilder()
    .setTitle('Courses API')
    .setDescription('API for managing courses')
    .setVersion('1.0')
    .addTag('courses')
    .build();

  const coursesDocument = SwaggerModule.createDocument(app, coursesConfig, {
    include: [CoursesModule],
  });

  SwaggerModule.setup('api/courses', app, coursesDocument);

  await app.listen(API_PORT);
  console.log(`Main app running on port ${API_PORT}`);
}
bootstrap();
