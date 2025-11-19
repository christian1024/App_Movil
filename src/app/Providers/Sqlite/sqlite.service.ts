import {Injectable} from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {Platform} from "@ionic/angular";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private isOpen: boolean;
  private db: SQLiteObject;
  private sqlite: SQLite;
  public date: string;
  public existe: string;
  public ubicacion: string;


  constructor(
    public platform: Platform
  ) {
    this.platform.ready().then(() => {
      if (!this.isOpen) {
        this.sqlite = new SQLite();
        this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
          this.db = db;
          let sql = 'CREATE TABLE IF NOT EXISTS LecturaRecibo(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            'NumViaje TEXT,' +
            'Plantas TEXT,' +
            'PlotID TEXT,' +
            'Operariosiembra TEXT,' +
            'Create_at TEXT' +
            ')';
          let sqluno = 'CREATE TABLE IF NOT EXISTS LecturaSiembra(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            'PlotID TEXT,' +
            'PlantasSembradas TEXT,' +
            'ubicacion TEXT,' +
            'Raiz TEXT,' +
            'Cono TEXT,' +
            'Pinch TEXT,' +
            'Faltante TEXT,' +
            'Otro TEXT,' +
            'CausalOtros TEXT,' +
            'CodigoConfirmacion TEXT,' +
            'Observacion TEXT,' +
            'Create_at TEXT,' +
            'Update_at TEXT' +
            ')';

          let sqldos = 'CREATE TABLE IF NOT EXISTS CalificacionSiembra(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            'PlotID TEXT,' +
            'ubicacion TEXT,' +
            'Operario TEXT,' +
            'Calificacion TEXT' +
            ')';

          let sqltres = 'CREATE TABLE IF NOT EXISTS SiembraRechaza(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            'PlotID TEXT,' +
            'Observaciones TEXT' +
            ')';
          db.executeSql(sql, []);
          db.executeSql(sqluno, []);
          db.executeSql(sqldos, []);
          db.executeSql(sqltres, []);
          this.isOpen = true;
        }).catch((error) => {
          console.log(error);
        });
      }
    });
  }

  ExistePlot(plot: number) {
    /******************** CONSULTA SI YA SE RECIBIO EL PLOT **********************************/
    return new Promise((resolve, reject) => {
      this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
        this.db.executeSql("SELECT PlotID FROM LecturaRecibo where PlotID = ?", [plot]).then((data) => {
          let arrayUsers = [];
          if (data.rows.length > 0) {
            for (let i = 0; i < data.rows.length; i++) {
              arrayUsers.push({
                PlotID: data.rows.item(i).PlotID,
              });
            }
          }
          resolve(arrayUsers);
        }, (error) => {
          reject(error);
        });
      });
    });
  }

  /******************** INSERTA DATOS DE RECIBIDOS **********************************/
  crearRecibidoLite(data: any) {
    return new Promise((resolve, reject) => {
      this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
        console.log(data);
        this.date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
        let sql = "INSERT INTO LecturaRecibo (NumViaje, Plantas, PlotID, Operariosiembra, Create_at) VALUES (?,?,?,?,?)";
        this.db.executeSql(sql, [data.Numviaje, data.Numplantas, data.Numplot, data.CodOper, this.date]).then((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        });
      });
    });
  }

  /******************** INSERTA DATOS DE INICIO DE SIEMBRA Y OPERARIOS **********************************/
  InciarSiembralite(data: any) {
    return new Promise((resolve, reject) => {
      if (data.Numplot === null || data.Numplot === '' || data.Ubicacion === '' || data.Ubicacion === null || data.Operuno === '' || data.Operuno === null) {
        data = '0';
        resolve(data);
      } else {
        // resolve(data);
        this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
          this.date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
          let sql = "INSERT INTO LecturaSiembra (PlotID, Ubicacion, Create_at) VALUES (?,?,?)";
          this.db.executeSql(sql, [data.Numplot, data.Ubicacion, this.date]).then((data) => {
            resolve(data);
          }, (error) => {
            reject(error);
          });
        });
      }
    });
  }

  GuardarOperarioCalificacion(data: any) {
    return new Promise((resolve, reject) => {
      this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
        if (data.Operuno === null) {
          data.Operuno = '';
        }
        if (data.Operdos === null) {
          data.Operdos = '';
        }
        if (data.Opertres === null) {
          data.Opertres = '';
        }
        if (data.OperCuatro === null) {
          data.OperCuatro = '';
        }

        if (data.Operuno >= 1 && data.Operdos === '' && data.Opertres === '' && data.OperCuatro === '') {
          console.log('1 operario');
          let sql = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          this.db.executeSql(sql, [data.Numplot, data.Ubicacion, data.Operuno]).then((data) => {
            resolve(data);
          }, (error) => {
            reject(error);
          });
        } else if (data.Operuno >= 1 && data.Operdos >= 1 && data.Opertres === '' && data.OperCuatro === '') {
          let sql = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          let sql2 = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          this.db.executeSql(sql, [data.Numplot, data.Ubicacion, data.Operuno]);
          this.db.executeSql(sql2, [data.Numplot, data.Ubicacion, data.Operdos]).then((data) => {
          }, (error) => {
            reject(error);
          });
        } else if (data.Operuno >= 1 && data.Operdos >= 1 && data.Opertres >= 1 && data.OperCuatro === '') {
          let sql = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          let sql2 = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          let sql3 = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          this.db.executeSql(sql, [data.Numplot, data.Ubicacion, data.Operuno]);
          this.db.executeSql(sql2, [data.Numplot, data.Ubicacion, data.Operdos]);
          this.db.executeSql(sql3, [data.Numplot, data.Ubicacion, data.Opertres]).then((data) => {
          }, (error) => {
            reject(error);
          });
        } else if (data.Operuno >= 1 && data.Operdos >= 1 && data.Opertres >= 1 && data.OperCuatro >= 1) {
          let sql = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          let sql2 = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          let sql3 = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          let sql4 = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          this.db.executeSql(sql, [data.Numplot, data.Ubicacion, data.Operuno]);
          this.db.executeSql(sql2, [data.Numplot, data.Ubicacion, data.Operdos]);
          this.db.executeSql(sql3, [data.Numplot, data.Ubicacion, data.Opertres]);
          this.db.executeSql(sql4, [data.Numplot, data.Ubicacion, data.OperCuatro]).then((data) => {
          }, (error) => {
            reject(error);
          });
        } else {
          console.log('error');
        }

      });
    });
  }

  /******************** INSERTA DATOS DE FIN  DE SIEMBRA  ACTUALIZA TABLA **********************************/
  FinalizaSiembralite(data: any) {
    return new Promise((resolve, reject) => {
      console.log(data);
      if (data.Numplot === null || data.Numplot === '' || data.Ubicacion === '' || data.Ubicacion === null || data.PLantas === '' || data.PLantas === null) {
        data = '0';
        resolve(data);
      } else {
        this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
          this.db.executeSql("SELECT PlotID FROM LecturaSiembra where PlotID = ? and ubicacion=? ", [data.Numplot, data.Ubicacion]).then((data2) => {
            console.log(data2);
            if (data2.rows.length > 0) {
              this.date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
              let sql = "UPDATE LecturaSiembra SET PlantasSembradas=?, Raiz=?, Cono=?, Pinch=?, Faltante=?, Otro=?,CausalOtros=?, Update_at=? WHERE PlotID=? and ubicacion=? ";
              this.db.executeSql(sql, [data.PLantas, data.Raiz, data.Cono, data.Pinch, data.Faltante, data.Otros, data.CausalOtros, this.date, data.Numplot, data.Ubicacion]).then((data) => {
                resolve(data);
              }, (error) => {
                reject(error);
              });
            } else {
              data = '1';
              resolve(data);
            }
          }, (error) => {
            reject(error);
          });
        });
      }
    });
  }

  /******************** INSERTA DATOS DE CONFIRMACION SIEMBRA ACTUALIZA TABLA **********************************/
  ConfirmacionSiembra(data: any) {
    return new Promise((resolve, reject) => {
      console.log(data);
      if (data.PlotId === null || data.PlotId === '' || data.Codigo === '' || data.Codigo === null || data.Ubicacion === '' || data.Ubicacion === null || data.Plantas === '' || data.Plantas === null) {
        data = '0';
        resolve(data);
      } else {
        this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
          this.db.executeSql("SELECT PlotID FROM LecturaSiembra where PlotID = ? and ubicacion=? ", [data.PlotId, data.Ubicacion]).then((data2) => {
            console.log(data2);
            if (data2.rows.length > 0) {
              this.date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
              let sql = "UPDATE LecturaSiembra SET PlantasSembradas=?, CodigoConfirmacion=?, Observacion=?  WHERE PlotID=? and ubicacion=? ";
              this.db.executeSql(sql, [data.Plantas, data.Codigo, data.Comentario, data.PlotId, data.Ubicacion]).then((data) => {
                resolve(data);
              }, (error) => {
                reject(error);
              });
            } else {
              data = '1';
              resolve(data);
            }
          }, (error) => {
            reject(error);
          });
        });
      }
    });
  }


  GuardarCalificacionOperFinal(data: any) {

    console.log(data);
    return new Promise((resolve, reject) => {
      this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
        /*if (data.Operuno === null) {
          data.Operuno = '';
        }
        if (data.Operdos === null) {
          data.Operdos = '';
        }
        if (data.Opertres === null) {
          data.Opertres = '';
        }
        if (data.OperCuatro === null) {
          data.OperCuatro = '';
        }

        if (data.Operuno >= 1 && data.Operdos === '' && data.Opertres === '' && data.OperCuatro === '') {
          console.log('1 operario');
          let sql = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          this.db.executeSql(sql, [data.Numplot, data.Ubicacion, data.Operuno]).then((data) => {
            resolve(data);
          }, (error) => {
            reject(error);
          });
        } else if (data.Operuno >= 1 && data.Operdos >= 1 && data.Opertres === '' && data.OperCuatro === '') {
          let sql = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          let sql2 = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          this.db.executeSql(sql, [data.Numplot, data.Ubicacion, data.Operuno]);
          this.db.executeSql(sql2, [data.Numplot, data.Ubicacion, data.Operdos]).then((data) => {
          }, (error) => {
            reject(error);
          });
        } else if (data.Operuno >= 1 && data.Operdos >= 1 && data.Opertres >= 1 && data.OperCuatro === '') {
          let sql = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          let sql2 = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          let sql3 = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          this.db.executeSql(sql, [data.Numplot, data.Ubicacion, data.Operuno]);
          this.db.executeSql(sql2, [data.Numplot, data.Ubicacion, data.Operdos]);
          this.db.executeSql(sql3, [data.Numplot, data.Ubicacion, data.Opertres]).then((data) => {
          }, (error) => {
            reject(error);
          });
        } else if (data.Operuno >= 1 && data.Operdos >= 1 && data.Opertres >= 1 && data.OperCuatro >= 1) {
          let sql = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          let sql2 = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          let sql3 = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          let sql4 = "INSERT INTO CalificacionSiembra (PlotID, ubicacion, Operario) VALUES (?,?,?)";
          this.db.executeSql(sql, [data.Numplot, data.Ubicacion, data.Operuno]);
          this.db.executeSql(sql2, [data.Numplot, data.Ubicacion, data.Operdos]);
          this.db.executeSql(sql3, [data.Numplot, data.Ubicacion, data.Opertres]);
          this.db.executeSql(sql4, [data.Numplot, data.Ubicacion, data.OperCuatro]).then((data) => {
          }, (error) => {
            reject(error);
          });
        } else {
          console.log('error');
        }*/

      });
    });
  }




  /*pruebasqlite() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM LecturaRecibo", []).then((data) => {
        let arrayUsers = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            arrayUsers.push({
              NumViaje: data.rows.item(i).NumViaje,
              Plantas: data.rows.item(i).Plantas,
              PlotID: data.rows.item(i).PlotID,
              Operariosiembra: data.rows.item(i).Operariosiembra,
              Create_at: data.rows.item(i).Create_at,
            });
          }
        }
        resolve(arrayUsers);
      }, (error) => {
        reject(error);
      });
    });
  }*/

  pruebasqlite() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM LecturaSiembra", []).then((data) => {
        console.log(data);
        let arrayUsers = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            arrayUsers.push({
              PlotID: data.rows.item(i).PlotID,
              PlantasSembradas: data.rows.item(i).PlantasSembradas,
              ubicacion: data.rows.item(i).ubicacion,
              Raiz: data.rows.item(i).Raiz,
              Cono: data.rows.item(i).Cono,
              Pinch: data.rows.item(i).Pinch,
              Faltante: data.rows.item(i).Faltante,
              Otro: data.rows.item(i).Otro,
              CausalOtros: data.rows.item(i).CausalOtros,
              CodigoConfirmacion: data.rows.item(i).CodigoConfirmacion,
              Estado: data.rows.item(i).Estado,
              Observacion: data.rows.item(i).Observacion,
              Create_at: data.rows.item(i).Create_at,
              Update_at: data.rows.item(i).Update_at
            });
          }
        }
        resolve(arrayUsers);
      }, (error) => {
        reject(error);
      });
    });
  }

  /* pruebasqlite() {
     return new Promise((resolve, reject) => {
       this.db.executeSql("SELECT * FROM CalificacionSiembra", []).then((data) => {
         console.log(data);
         let arrayUsers = [];
         if (data.rows.length > 0) {
           for (let i = 0; i < data.rows.length; i++) {
             arrayUsers.push({
               PlotID: data.rows.item(i).PlotID,
               ubicacion: data.rows.item(i).ubicacion,
               Operario: data.rows.item(i).Operario,
               Calificacion: data.rows.item(i).Calificacion
             });
           }
         }
         resolve(arrayUsers);
       }, (error) => {
         reject(error);
       });
     });
   }*/


  LimpiarTablas() {
    return new Promise((resolve, reject) => {
      this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
        let sql1 = 'delete from LecturaRecibo';
        let sql2 = 'delete from LecturaSiembra';
        let sql3 = 'delete from LecturaSiembra';
        let sql4 = 'delete from SiembraRechaza';
        db.executeSql(sql1, []);
        db.executeSql(sql2, []);
        db.executeSql(sql3, []);
        db.executeSql(sql4, []);
        let data = 1;
        resolve(data);
      }).catch((error) => {
        console.log(error);
      });
    });

  }

  ConsultarPlot(data:any){
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT id,Operario FROM CalificacionSiembra where PlotID=? and ubicacion=?", [data.Numplot, data.Ubicacion]).then((data) => {
        let arrayOper = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            arrayOper.push({
              id: data.rows.item(i).id,
              oper: data.rows.item(i).Operario,
            });
          }
        }
        //console.log(arrayOper);
        resolve(arrayOper);
      }, (error) => {
        reject(error);
      });
    });
  }
}

