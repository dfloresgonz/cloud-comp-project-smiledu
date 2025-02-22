import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Course } from 'apps/utils/types';
import { FormattedAcademicoRecord } from '../../../utils/types';

@ApiTags('Courses api')
@Controller('v1/courses')
export class CoursesController {
  constructor(
    @Inject('COURSES_SERVICE') private readonly coursesClient: ClientProxy,
  ) {}

  @ApiOperation({ summary: 'List all courses' })
  @ApiResponse({
    status: 200,
    description: 'List of courses',
    type: [Course],
  })
  @Get()
  async listCourses(): Promise<Course[]> {
    console.log('listCourses');
    return await lastValueFrom(
      this.coursesClient.send('pe.softhy.smiledu.courses.get', {}),
    );
  }

  @ApiOperation({ summary: 'Get course by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Course details', type: Course })
  @Get(':id')
  async getCourseById(@Param('id') id: number): Promise<Course> {
    return await lastValueFrom(
      this.coursesClient.send('pe.softhy.smiledu.courses.getById', id),
    );
  }

  @ApiOperation({ summary: 'Create a new course' })
  @ApiBody({ type: Course })
  @ApiResponse({ status: 201, description: 'Course created' })
  @Post()
  async createCourse(@Body() course: Course): Promise<void> {
    return await lastValueFrom(
      this.coursesClient.send('pe.softhy.smiledu.courses.create', course),
    );
  }

  @ApiOperation({ summary: 'Delete course by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Course deleted', type: Boolean })
  @Delete(':id')
  async deleteCourse(@Param('id') id: number): Promise<boolean> {
    return await lastValueFrom(
      this.coursesClient.send('pe.softhy.smiledu.courses.delete', id),
    );
  }

  @ApiOperation({ summary: 'Get notas by student ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'List notas',
    type: FormattedAcademicoRecord,
  })
  @Get('/notas/student/:id')
  async getByNotasStudentId(
    @Param('id') id: number,
  ): Promise<FormattedAcademicoRecord> {
    return await lastValueFrom(
      this.coursesClient.send('pe.softhy.smiledu.notas.getByStudentId', id),
    );
  }
}
