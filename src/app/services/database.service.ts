import { Injectable } from '@angular/core';
import * as sqlite3 from 'sqlite3'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: sqlite3.Database;

  constructor() {
    this.database = new sqlite3.Database('/harmonydb.sqlite');
  }

  query(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

