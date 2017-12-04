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

  private database: SQLiteObject;
  private isOpen: boolean;

  constructor(
    public http: Http,
    public storage: SQLite
  ) {
    if (!this.isOpen) {
      this.storage = new SQLite();
      this.storage.create({ name: "data.db", location: "default" }).then((db: SQLiteObject) => {
        this.database = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS materials (id INTENGER PRIMARY KEY AUTOINCREMENT, amount INTENGER, description TEXT, ud TEXT, total INTENGER)", []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })
    }
}
  

    // Insertando valores del materiales

  createMaterilas(id: number, amount:number, description:string, ud:string, total:string ){
    return new Promise ((resolve, Reflect) => {
      let sql = "INSERT INTO materials (id, amount, description, ud, total) VALUES (?,?,?,?,?)";
      this.database.executeSql(sql, [id, amount, description, ud, total]).then((data) =>{
        resolve(data);
      }, (error) => {
        Reflect(error);
      });
    });
  }

  getMaterials(){
    return new Promise ((resolve, reject) =>{
      this.database.executeSql("SELECT FROM materials" , []).then((data) => {
        let arrayMatMamp = [];
        if (data.rows.length = 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayMatMamp.push({
              id: data.rows.item(i).id,
              amount: data.rows.item(i).amount,
              description: data.rows.item(i).description,
              ud: data.rows.item(i).ud,
              total: data.rows.item(i).total
            });            
          }          
        }
        resolve(arrayMatMamp);
      }, (error) => {
        reject(error);
      })
    })
    }
  



 /* deleteList(id:number){ }

  getTodosFromList(listId:number){ }
  addTodo(description:string, isImportant:boolean, isDone:boolean, listId:number){ }
  modifyTodo(description:string, isImportant:boolean, isDone:boolean, id:number){ }
  removeTodo(id:number){ }
*/
}
