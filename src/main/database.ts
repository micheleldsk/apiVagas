import { DataSource } from 'typeorm';
import { config } from './config/typeorm.config';

export class DatabaseConnection {
  private static _client: any;

  public static get client(): DataSource {
    return DatabaseConnection._client;
  }

  static async connect(): Promise<void> {
    DatabaseConnection._client = new DataSource(config);
    await DatabaseConnection._client.initialize();
  }

  static async disconnect(): Promise<void> {
    await DatabaseConnection._client.destroy();
    DatabaseConnection._client = null as any;
  }
};
