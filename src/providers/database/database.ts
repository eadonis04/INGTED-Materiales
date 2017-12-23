import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private db: SQLiteObject;
  private isOpen: boolean;

  constructor(
    public http: Http,
    public storage: SQLite
  ) {
    if (!this.isOpen) {
      this.storage = new SQLite();
      this.storage.create({ name: "data.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql('CREATE TABLE IF NOT EXISTS `materials`(`id` INTEGER PRIMARY KEY,`amount` TEXT,`description` TEXT,ud TEXT,`total` INTEGER, base INTEGER, height INTEGER )', []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })
    }
}
  

    // Insertando valores del materiales

  createMaterilas( amount:string, description:string, ud:string, total:any, base: number, height: number ){
    return new Promise ((resolve, reject) => {
      let sql = "INSERT INTO materials( amount, description,ud,total,base, height) VALUES (?,?,?,?,?,?)";
      this.db.executeSql(sql, [amount, description, ud, total, base, height]).then((data) =>{
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  getMaterials(){
    return new Promise ((resolve, reject) =>{
      this.db.executeSql("SELECT * FROM materials", []).then((data) => {
        let arrayMatMamp = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayMatMamp.push({
              id: data.rows.item(i).id,
              amount: data.rows.item(i).amount,
              description: data.rows.item(i).description,
              ud: data.rows.item(i).ud,
              total: data.rows.item(i).total,
              base: data.rows.item(i).base,
              height: data.rows.item(i).height
            });            
          }          
        }
        resolve(arrayMatMamp);
      }, (error) => {
        reject(error);
      })
    })
    }
  
    delete(rowid){
      let sql = 'DELETE FROM materials WHERE rowid=?';
      return this.db.executeSql(sql, [rowid]);
    }
  
}
