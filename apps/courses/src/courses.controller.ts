import { Controller } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Course, FormattedAcademicoRecord } from 'apps/utils/types';
import { NotasService } from './notas/notas.service';

@Controller()
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly notasService: NotasService,
  ) {}

  @MessagePattern('pe.softhy.smiledu.courses.get')
  async listCourses(): Promise<Course[]> {
    return this.coursesService.listCourses();
  }

  @MessagePattern('pe.softhy.smiledu.courses.getById')
  async getCourseById(@Payload() id: number): Promise<Course> {
    return this.coursesService.getCourseById(id);
  }

  @MessagePattern('pe.softhy.smiledu.courses.create')
  async createCourse(@Payload() course: Course): Promise<Course> {
    return this.coursesService.createCourse(course);
  }

  @MessagePattern('pe.softhy.smiledu.courses.delete')
  async deleteCourse(@Payload() id: number): Promise<boolean> {
    return this.coursesService.deleteCourse(id);
  }

  @MessagePattern('pe.softhy.smiledu.notas.getByStudentId')
  async getByNotasStudentId(
    @Payload() id: string,
  ): Promise<FormattedAcademicoRecord[]> {
    return this.notasService.getStudentGrades(id);
  }
}
