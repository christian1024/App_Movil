import {Component, OnInit} from '@angular/core';
import {AlertController, NavController, Platform, ToastController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SqliteService} from "../Providers/Sqlite/sqlite.service";

@Component({
  selector: 'app-lectura-fin-siembra',
  templateUrl: './lectura-fin-siembra.component.html',
  styleUrls: ['./lectura-fin-siembra.component.scss'],
})
export class LecturaFinSiembraComponent implements OnInit {
  mostrarInput: boolean = false;
  FromActualizar: FormGroup;
  private otros: any = 0;

  constructor(
    public navCtrl: NavController,
    private form: FormBuilder,
    public platform: Platform,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public ServiceSqlite: SqliteService
  ) {
    this.FromActualizar = this.form.group({
      PLantas: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      Numplot: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      Ubicacion: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      Raiz: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      Cono: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      Pinch: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      Faltante: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      Otros: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
      CausalOtros: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
  }

  ngOnInit() {
  }

  GuardaFinSiembra() {
    this.ServiceSqlite.FinalizaSiembralite(this.FromActualizar.value).then((data: any) => {
      if (data==='0'){
        this.AlertDatosVacios();
      }else if (data==='1') {
        this.AlertDatosNoExisten();
        this.FromActualizar = this.form.group({
          PLantas: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          Numplot: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          Ubicacion: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          Raiz: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          Cono: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          Pinch: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          Faltante: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          Otros: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])],
          CausalOtros: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        });
      }else{
        this.AlertDatosGuardados();
        this.FromActualizar.reset();
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
      message: 'Debe diligenciar PLot, Ubicacion Y Cantidad Plantas',
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

  onInputTime() {
    this.otros = this.FromActualizar.value.otros;
    if (this.otros > 0) {
      this.mostrarInput = true;
    } else {
      this.mostrarInput = false;
    }
  }
}
