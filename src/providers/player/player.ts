import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { PlayerAccountInfoDTO } from '../../models/data.dto';
import { SQLiteObject } from '@ionic-native/sqlite';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


/*
  Generated class for the PlayerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlayerProvider {

  constructor(private dbProvider: DatabaseProvider) {
    console.log('Hello PlayerProvider Provider');
  }


  public insert(playerInfo:PlayerAccountInfoDTO){
    return this.dbProvider.getDB()
    .then((dB:SQLiteObject)=>{
      let sql = 'insert into ' + this.dbProvider.PLAYERACCOUNTINFO_TABLE 
        +'('+ this.dbProvider.PLAYERACCOUNTINFO_UUID_COLUMN +', '
        +this.dbProvider.PLAYERACCOUNTINFO_NAME_COLUMN +''
        + ') values (?,?)';
        let data = [playerInfo.data.uid, playerInfo.data.username, false];

        return dB.executeSql(sql, data)
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }


  public setFavorite(player: PlayerAccountInfoDTO, favorite: boolean) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update  ' + this.dbProvider.PLAYERACCOUNTINFO_TABLE + ' set  ' 
          +this.dbProvider.PLAYERACCOUNTINFO_FAVORITO_COLUMN + ' = ? '
          +' where '
          + this.dbProvider.PLAYERACCOUNTINFO_UUID_COLUMN + ' = ? ';

        let data = [favorite ? 1 : 0, player.data.uid];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(uuid: string) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from '+ this.dbProvider.PLAYERACCOUNTINFO_TABLE +' where '
        + this.dbProvider.PLAYERACCOUNTINFO_UUID_COLUMN + ' = ? ';

        let data = [uuid];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(uuid: string) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from '+ this.dbProvider.PLAYERACCOUNTINFO_TABLE +' where '
        + this.dbProvider.PLAYERACCOUNTINFO_UUID_COLUMN + ' = ? ';

        let data = [uuid];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let player = new PlayerList(item.uuid, item.name, item.favorito);
              return player;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll(favorito: boolean) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * '+  /*', c.name as category_name*/ ' FROM'  
        + this.dbProvider.PLAYERACCOUNTINFO_TABLE;
        var data: any[] = [];

        // filtrando pelo nome
        if (favorito) {
          sql += ' where ' + this.dbProvider.PLAYERACCOUNTINFO_FAVORITO_COLUMN +' = ?';
          data.push(favorito ? 1 : 0);
        }

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let players: PlayerList[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var item = data.rows.item(i);

                players.push(new PlayerList(item.uuid, item.name, item.favorito));
              }
              return players;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}


export class PlayerList {

  constructor(
  public uuid: string,
  public username: string,
  public favorite: boolean = false,
  public compare: boolean = false,){

  }

 public static from(player: PlayerAccountInfoDTO, favorite: boolean, compare: boolean): PlayerList{
    return new PlayerList(player.data.uid, player.data.username, favorite, compare );
  }
}