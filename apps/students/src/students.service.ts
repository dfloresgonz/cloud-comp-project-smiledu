import { Injectable } from '@nestjs/common';
import { Student } from 'apps/utils/types';
import { Database } from 'apps/utils/database';

@Injectable()
export class StudentsService {
  async listStudents(): Promise<Student[]> {
    const { rows } = await Database.getPool().query('SELECT * FROM students');
    return rows;
  }

  async getStudentById(id: number): Promise<Student> {
    const { rows } = await Database.getPool().query(
      'SELECT * FROM students WHERE id = $1',
      [id],
    );
    return rows[0];
  }

  async deleteStudent(id: number): Promise<boolean> {
    await Database.getPool().query('DELETE FROM students WHERE id = $1', [id]);
    return true;
  }

  async createStudent(student: Student): Promise<Student> {
    console.log('createStudent', student);
    try {
      const { name, lastname, age, grade, picture, email } = student;
      const { rows } = await Database.getPool().query(
        'INSERT INTO students (name, lastname, age, grade, picture, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [name, lastname, age, grade, picture, email],
      );
      console.log('resp', rows[0]);
      student.id = rows[0].id;
      return student;
    } catch (error) {
      console.error('Error:::', error);
      throw new Error('Error creating student');
    }
  }
}
