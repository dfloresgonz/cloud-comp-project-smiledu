import { Injectable } from '@nestjs/common';
import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { ConfigService } from '@nestjs/config';
import { AcademicoRecord, FormattedAcademicoRecord } from 'apps/utils/types';

@Injectable()
export class NotasService {
  private readonly ddbDocClient: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION_DYNAMODB');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );

    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error('Missing AWS configuration');
    }

    const clientConfig: DynamoDBClientConfig = {
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    };

    const ddbClient = new DynamoDBClient(clientConfig);
    this.ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
    this.tableName = 'academico';
  }

  async getByPKGSI(pkgsi: string): Promise<FormattedAcademicoRecord[]> {
    const params: QueryCommandInput = {
      TableName: this.tableName,
      IndexName: 'GSI',
      KeyConditionExpression: 'PKGSI = :pkgsi',
      ExpressionAttributeValues: {
        ':pkgsi': pkgsi,
      },
    };

    try {
      const command = new QueryCommand(params);
      const result = await this.ddbDocClient.send(command);
      const records = result.Items as AcademicoRecord[];
      return this.formatResponse(records);
    } catch (error) {
      throw new Error(`Failed to query DynamoDB: ${error.message}`);
    }
  }
  async getStudentGrades(
    studentId: string,
  ): Promise<FormattedAcademicoRecord[]> {
    return this.getByPKGSI(`STUDENT#${studentId}`);
  }

  async getCourseStudents(
    courseId: string,
  ): Promise<FormattedAcademicoRecord[]> {
    return this.getByPKGSI(`COURSE#${courseId}`);
  }

  private formatResponse(records: AcademicoRecord[]) {
    return records.map((record) => ({
      pk: record.PK,
      sk: record.SK,
      data: record.data,
      pkgsi: record.PKGSI,
      skgsi: record.SKGSI,
    }));
  }
}
