import {Component, OnInit} from '@angular/core';
import {AlertController, NavController, Platform, ToastController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SqliteService} from "../Providers/Sqlite/sqlite.service";

@Component({
  selector: 'app-lectura-recibio',
  templateUrl: './lectura-recibio.component.html',
  styleUrls: ['./lectura-recibio.component.scss'],
})
export class LecturaRecibioComponent implements OnInit {

  FormCrearRe: FormGroup;
  UltimoRegistro: FormGroup;
  private Numviaje: any = 0;
  private Numplot: any = 0;
  private CodOper: any = 0;
  private Numplantas: any = 0;

  private UltPLot: any = 0;
  private UltCanPla: any = 0;
  private Existe: any = 0;
  private Radicado: any = 0;

  constructor(
    public navCtrl: NavController,
    private form: FormBuilder,
    public platform: Platform,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public ServiceSqlite: SqliteService
  ) {
    this.FormCrearRe = this.form.group({
      Numplantas: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      Numplot: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      CodOper: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      Numviaje: [this.Numviaje, Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
    });
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.NumeroViaje();
    });
  }

  NumeroViaje() {
    this.Radicado = this.Radicado + 1;
    this.Numviaje = this.Radicado;
  }

  PlotExiste() {
    this.Existe = this.FormCrearRe.value.Numplot;
    this.ServiceSqlite.ExistePlot(this.Existe).then((data) => {
      if (data >= '0') {
        this.AlertExistePlot();
        this.navCtrl.navigateForward('/LecturaRecibido');
        this.FormCrearRe = this.form.group({
          Numplantas: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          Numplot: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          CodOper: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          Numviaje: [this.Numviaje, Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
        });
      }
    }, (error) => {
      console.log(error);
    });
  }

  crearRecibido() {
    console.log(this.FormCrearRe.value);
    this.ServiceSqlite.crearRecibidoLite(this.FormCrearRe.value).then((data: any) => {
      if (data) {
        this.presentAlert();
        this.navCtrl.navigateForward('/LecturaRecibido');
        this.FormCrearRe = this.form.group({
          Numplantas: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          Numplot: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          CodOper: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          Numviaje: [this.Numviaje, Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
        });
        console.log(this.Numplot);
      }
    }, (error) => {
      console.log(error);
    });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Perfecto',
      message: 'Datos Guardados',
      buttons: ['OK']
    });
    await alert.present();
  }

  async AlertExistePlot() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'ERROR',
      //subHeader: 'Subtitle',
      message: 'Ya registrado',
      buttons: ['Aceptar']
    });

    await alert.present();
  }


}
