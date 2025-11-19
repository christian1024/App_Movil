import { Component } from '@angular/core';
import {ConexionhttpService} from "./Providers/http/conexionhttp.service";
import {AlertController, NavController} from "@ionic/angular";
import {Validators} from "@angular/forms";
import {SqliteService} from "./Providers/Sqlite/sqlite.service";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title: 'Lectura Recibido', url: '/LecturaRecibido', icon: 'scan'},
    {title: 'Lectura Inicio Siembra', url: '/LecturaInicioSiembra', icon: 'scan'},
    {title: 'Lectura Final Siembra', url: '/LecturaFinSiembra', icon: 'scan'},
    {title: 'Lectura Confirmación Siembra', url: '/LecturaConfirmacionSiembra', icon: 'scan'},
    {title: 'Calidad Siembra', url: '/LecturaCalidadSiembra', icon: 'scan'},
    {title: 'Rechazo Siembra', url: '/LecturaRechazo', icon: 'scan'},
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private http: ConexionhttpService,
    private navCtrl: NavController,
    private ServiceSqlite: SqliteService,
    public alertCtrl: AlertController,
    public Menu: MenuController,
  ) {}

  paginaprueba(){
    //this.navCtrl.navigateBack(['pageprueba']);
    this.navCtrl.navigateForward('/pageprueba');
  }
  Limpiartablas(){
    this.ServiceSqlite.LimpiarTablas().then((data: any) => {
      console.log(data);
      if (data===1) {
        this.AlertTDatos();
        this.navCtrl.navigateForward('/LecturaRecibido');
        this.Menu.close();

      }
    }, (error) => {
      console.log(error);
    });
  }

  EvnviarDatos(){
    this.http.loadUsers().then((data: any) => {
       console.log(data);
    }, (error) => {
      console.log(error);
    });
  }

  async AlertTDatos() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Bien',
      message: 'Las tablas estan limpias',
      buttons: ['Aceptar']
    });
    await alert.present();
  }
}
