import { Controller } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Course } from 'apps/utils/types';

@Controller()
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

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
}
