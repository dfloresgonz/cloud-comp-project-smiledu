import { Injectable } from '@nestjs/common';
import { Database } from 'apps/utils/database';
import { Course } from 'apps/utils/types';

@Injectable()
export class CoursesService {
  async listCourses(): Promise<Course[]> {
    const { rows } = await Database.getPool().query('SELECT * FROM courses');
    return rows;
  }

  async getCourseById(id: number): Promise<Course> {
    const { rows } = await Database.getPool().query(
      'SELECT * FROM courses WHERE id = $1',
      [id],
    );
    return rows[0];
  }

  async deleteCourse(id: number): Promise<boolean> {
    await Database.getPool().query('DELETE FROM courses WHERE id_course = $1', [
      id,
    ]);
    return true;
  }

  async createCourse(course: Course): Promise<Course> {
    console.log('createCourse', course);
    try {
      const { name, grado } = course;
      const { rows } = await Database.getPool().query(
        'INSERT INTO courses (name, grado) VALUES ($1, $2) RETURNING id_course',
        [name, grado],
      );
      console.log('resp', rows[0]);
      course.id = rows[0].id;
      return course;
    } catch (error) {
      console.error('Error:::', error);
      throw new Error('Error creating course');
    }
  }
}
