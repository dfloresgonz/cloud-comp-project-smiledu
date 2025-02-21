import { ApiProperty } from '@nestjs/swagger';

export class Student {
  @ApiProperty()
  name: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  grade: string;
  @ApiProperty()
  picture: string;

  @ApiProperty()
  email: string;
  @ApiProperty()
  id: number;
}

export class Course {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  grado: number;
}
