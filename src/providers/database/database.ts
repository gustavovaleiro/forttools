
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  public readonly DATABASE_NAME = 'fortools.db';
  public readonly PLAYERACCOUNTINFO_TABLE = 'player';
  public  readonly PLAYERACCOUNTINFO_NAME_COLUMN = 'nome';
  public  readonly PLAYERACCOUNTINFO_FAVORITO_COLUMN = 'favorito';
  public  readonly PLAYERACCOUNTINFO_UUID_COLUMN = 'uuid';

  constructor(private sqlite: SQLite) {
    
    console.log('Hello DatabaseProvider Provider');
  }
  public getDB() {
    return this.sqlite.create({
      name: this.DATABASE_NAME,
      location: 'default'
    });
  }
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        // Criando as tabelas
        this.createTables(db);
      })
      .catch(e => console.log(e));
  }
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS '+this.PLAYERACCOUNTINFO_TABLE+
      ' (' + this.PLAYERACCOUNTINFO_UUID_COLUMN +' TEXT primary key NOT NULL,'
       +this.PLAYERACCOUNTINFO_NAME_COLUMN+' TEXT NOT NULL, '
       +this.PLAYERACCOUNTINFO_FAVORITO_COLUMN+' INTEGER)'],
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }
}
