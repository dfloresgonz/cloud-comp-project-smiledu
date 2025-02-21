import { Controller } from '@nestjs/common';
import { StudentsService } from './students.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Student } from 'apps/utils/types';

@Controller()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @MessagePattern('pe.softhy.smiledu.students.get')
  async listStudents(): Promise<Student[]> {
    return await this.studentsService.listStudents();
  }

  @MessagePattern('pe.softhy.smiledu.students.getById')
  async getStudentById(@Payload() id: number): Promise<Student> {
    return await this.studentsService.getStudentById(id);
  }

  @MessagePattern('pe.softhy.smiledu.students.delete')
  async deleteStudent(@Payload() id: number): Promise<boolean> {
    return await this.studentsService.deleteStudent(id);
  }

  @MessagePattern('pe.softhy.smiledu.students.create')
  async createStudent(@Payload() student: Student): Promise<Student> {
    return await this.studentsService.createStudent(student);
  }
}
