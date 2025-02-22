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

export interface AcademicoRecord {
  PK: string;
  SK: string;
  data: {
    Curso?: { S: string };
    Nota?: { S: string };
  };
  PKGSI?: string;
  SKGSI?: string;
}

export class FormattedAcademicoRecord {
  @ApiProperty()
  pk: string;
  @ApiProperty()
  sk: string;
  @ApiProperty()
  data: {
    Curso?: { S: string };
    Nota?: { S: string };
  };
  @ApiProperty()
  pkgsi?: string;
  @ApiProperty()
  skgsi?: string;
}
