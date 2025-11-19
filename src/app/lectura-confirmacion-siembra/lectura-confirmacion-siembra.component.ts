import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, NavController, Platform, ToastController} from "@ionic/angular";
import {SqliteService} from "../Providers/Sqlite/sqlite.service";

@Component({
  selector: 'app-lectura-confirmacion-siembra',
  templateUrl: './lectura-confirmacion-siembra.component.html',
  styleUrls: ['./lectura-confirmacion-siembra.component.scss'],
})
export class LecturaConfirmacionSiembraComponent implements OnInit {

  FromConfirmacion: FormGroup;

  constructor(
    public navCtrl: NavController,
    private form: FormBuilder,
    public platform: Platform,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public ServiceSqlite: SqliteService
  ) {
    this.FromConfirmacion = this.form.group({
      PlotId: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      Codigo: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      Ubicacion: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      Plantas: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      Comentario: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
  }

  ngOnInit() {
  }

  GuardarConfirmacionSimebra() {
    this.ServiceSqlite.ConfirmacionSiembra(this.FromConfirmacion.value).then((data: any) => {
      if (data==='0'){
        this.AlertDatosVacios();
      }else if (data==='1') {
        this.AlertDatosNoExisten();
        this.FromConfirmacion = this.form.group({
          PlotId: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          Codigo: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          Ubicacion: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          Plantas: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          Comentario: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        });
      }else{
        this.AlertDatosGuardados();
        this.FromConfirmacion.reset();
      }
    }, (error) => {
      console.log(error);
    });
  }

  /*********************ALERTAS***************************************/

  async AlertDatosVacios() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'ERROR',
      message: 'Debe diligenciar Plot, Codigo, Confirmacion, ubicación y Cantidad Plantas',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async AlertDatosGuardados() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Bien',
      message: 'Datos Guardados Exitosamente',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async AlertDatosNoExisten() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Bien',
      message: 'revise PlotId, no coincide en esta ubicacion',
      buttons: ['Aceptar']
    });
    await alert.present();
  }


}
