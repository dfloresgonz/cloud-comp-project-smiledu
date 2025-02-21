import { Pool } from 'pg';

export class Database {
  private static pool: Pool;

  static readonly config: any = {
    user: process.env.USER_BD,
    host: process.env.HOST_BD,
    database: 'starwars',
    password: process.env.BD_PASS,
    port: process.env.BD_PORT,
  };

  public static getPool(): Pool {
    if (!this.pool) {
      this.pool = new Pool(this.config);
    }
    return this.pool;
  }

  public static async endPool(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
    }
  }
}
