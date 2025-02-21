import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { Student } from 'apps/utils/types';

@ApiTags('Student api')
@Controller('v1/students')
export class StudentController {
  constructor(
    @Inject('STUDENTS_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @ApiOperation({ summary: 'List all students' })
  @ApiResponse({
    status: 200,
    description: 'List of students',
    type: Array<Student>,
  })
  @Get()
  async listStudents(): Promise<Student[]> {
    console.log('listStudents');
    return await lastValueFrom(
      this.studentClient.send('pe.softhy.smiledu.students.get', {}),
    );
  }

  @ApiOperation({ summary: 'Get student by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Student details',
    type: Promise<Student>,
  })
  @Get(':id')
  async getStudentById(@Param('id') id: number): Promise<Student> {
    return await lastValueFrom(
      this.studentClient.send('pe.softhy.smiledu.students.getById', id),
    );
  }

  @ApiOperation({ summary: 'Delete student by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Student deleted', type: Boolean })
  @Delete(':id')
  async deleteStudent(@Param('id') id: number): Promise<boolean> {
    return await lastValueFrom(
      this.studentClient.send('pe.softhy.smiledu.students.delete', id),
    );
  }

  @ApiOperation({ summary: 'Create a new student' })
  @ApiBody({ type: Student })
  @ApiResponse({ status: 201, description: 'Student created' })
  @Post()
  async createStudent(@Body() student: Student): Promise<void> {
    return await lastValueFrom(
      this.studentClient.send('pe.softhy.smiledu.students.create', student),
    );
  }
}
