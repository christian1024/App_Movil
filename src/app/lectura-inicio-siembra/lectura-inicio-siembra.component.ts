import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, NavController, Platform, ToastController} from "@ionic/angular";
import {SqliteService} from "../Providers/Sqlite/sqlite.service";

@Component({
  selector: 'app-lectura-inicio-siembra',
  templateUrl: './lectura-inicio-siembra.component.html',
  styleUrls: ['./lectura-inicio-siembra.component.scss'],
})
export class LecturaInicioSiembraComponent implements OnInit {

  IniciarSiembra: FormGroup
  private Existe: any = 0;


  constructor(
    public navCtrl: NavController,
    private form: FormBuilder,
    public platform: Platform,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public ServiceSqlite: SqliteService
  ) {
    this.IniciarSiembra = this.form.group({
      Numplot: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      Ubicacion: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      Operuno: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      Operdos: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      Opertres: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      OperCuatro: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
    });
  }

  ngOnInit() {
  }

  PlotYarecibido() {

    this.Existe = this.IniciarSiembra.value.Numplot;
    this.ServiceSqlite.ExistePlot(this.Existe).then((data) => {
      if (data >= '0') {
      } else {
        this.navCtrl.navigateForward('/LecturaInicioSiembra');
        this.Alertplotsinrecibir();
        this.IniciarSiembra = this.form.group({
          Numplot: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/)])],
          Ubicacion: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          Operuno: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          Operdos: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          Opertres: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          OperCuatro: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
        });
      }
    }, (error) => {
      console.log(error);
    });
  }

  GuardaIniciarSiembra() {
    this.ServiceSqlite.InciarSiembralite(this.IniciarSiembra.value).then((data: any) => {
      if (data === '0') {
        this.AlertDatosVacios();
      } else {
        this.ServiceSqlite.GuardarOperarioCalificacion(this.IniciarSiembra.value).then((data: any) => {
          if (data){
            this.AlertDatosGuardados();
            this.IniciarSiembra.reset();
          }
        }, (error) => {
          console.log(error);
        });
      }
    }, (error) => {
      console.log(error);
    });
  }

  /*********************ALERTAS***************************************/

  async Alertplotsinrecibir() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'ERROR',
      message: 'No recibio este plot',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async AlertDatosVacios() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'ERROR',
      message: 'Debe diligenciar PLotid, Ubicacion Y operario uno',
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

}
