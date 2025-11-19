import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, NavController, Platform, ToastController} from "@ionic/angular";
import {SqliteService} from "../Providers/Sqlite/sqlite.service";

@Component({
  selector: 'app-lectura-calidad-siembra',
  templateUrl: './lectura-calidad-siembra.component.html',
  styleUrls: ['./lectura-calidad-siembra.component.scss'],
})
export class LecturaCalidadSiembraComponent implements OnInit {

  mostrarInput: boolean = false;
  ConsultarPlotCalidad: FormGroup;
  FormUpdateSiembra: FormGroup;

  ocultar1: boolean = false;
  divoper1: boolean = false;
  divoper2: boolean = false;
  divoper3: boolean = false;
  divoper4: boolean = false;
  private oper: any;

  constructor(
    public navCtrl: NavController,
    private form: FormBuilder,
    public platform: Platform,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public ServiceSqlite: SqliteService
  ) {
    this.ConsultarPlotCalidad = this.form.group({
      Numplot: ['', Validators.compose([Validators.required])],
      Ubicacion: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)])]
    });

    this.FormUpdateSiembra = this.form.group({
      Oper1: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
      Oper2: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
      Oper3: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
      Oper4: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],

      CalificacionOper1: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
      CalificacionOper2: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
      CalificacionOper3: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
      CalificacionOper4: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],

      idOper1: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
      idOper2: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
      idOper3: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
      idOper4: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
    });
  }

  ngOnInit() {

  }

  CalificarSimebra() {
    this.ServiceSqlite.ConsultarPlot(this.ConsultarPlotCalidad.value).then((data: any) => {
      if (data) {
        this.oper = data;
        if (this.oper.length === 1) {
         // console.log(data);
          this.FormUpdateSiembra = this.form.group({
            Oper1: [this.oper[0].oper, Validators.compose([Validators.required, Validators.minLength(1)])],
            idOper1: [this.oper[0].id, Validators.compose([Validators.required, Validators.minLength(1)])],
            CalificacionOper1: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
          });
          this.ocultar1 = true;
          this.divoper1 = true;
          this.divoper2 = false;
          this.divoper3 = false;
          this.divoper4 = false;

        } else if (this.oper.length === 2) {
          console.log('entro');
          this.FormUpdateSiembra = this.form.group({
            Oper1: [this.oper[0].oper,  Validators.compose([Validators.required, Validators.minLength(1)])],
            Oper2: [this.oper[1].oper, Validators.compose([Validators.required, Validators.minLength(1)])],

            idOper1: [this.oper[0].id, Validators.compose([Validators.required, Validators.minLength(1)])],
            idOper2: [this.oper[1].id, Validators.compose([Validators.required, Validators.minLength(1)])],

            CalificacionOper1: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
            CalificacionOper2: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
          });
          this.ocultar1 = true;
          this.divoper1 = true;
          this.divoper2 = true;
          this.divoper3 = false;
          this.divoper4 = false;
        }
        else if (this.oper.length === 3) {

          this.FormUpdateSiembra = this.form.group({
            Oper1: [this.oper[0].oper, Validators.compose([Validators.required, Validators.minLength(1)])],
            Oper2: [this.oper[1].oper, Validators.compose([Validators.required, Validators.minLength(1)])],
            Oper3: [this.oper[2].oper, Validators.compose([Validators.required, Validators.minLength(1)])],

            idOper1: [this.oper[0].id, Validators.compose([Validators.required, Validators.minLength(1)])],
            idOper2: [this.oper[1].id, Validators.compose([Validators.required, Validators.minLength(1)])],
            idOper3: [this.oper[2].id, Validators.compose([Validators.required, Validators.minLength(1)])],

            CalificacionOper1: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
            CalificacionOper2: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
            CalificacionOper3: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
          });
          this.ocultar1 = true;
          this.divoper1 = true;
          this.divoper2 = true;
          this.divoper3 = true;
          this.divoper4 = false;
        }
        else if (this.oper.length === 4) {
          this.FormUpdateSiembra = this.form.group({
            Oper1: [this.oper[0].oper, Validators.compose([Validators.required, Validators.minLength(1)])],
            Oper2: [this.oper[1].oper, Validators.compose([Validators.required, Validators.minLength(1)])],
            Oper3: [this.oper[2].oper, Validators.compose([Validators.required, Validators.minLength(1)])],
            Oper4: [this.oper[3].oper, Validators.compose([Validators.required, Validators.minLength(1)])],

            idOper1: [this.oper[0].id, Validators.compose([Validators.required, Validators.minLength(1)])],
            idOper2: [this.oper[1].id, Validators.compose([Validators.required, Validators.minLength(1)])],
            idOper3: [this.oper[2].id, Validators.compose([Validators.required, Validators.minLength(1)])],
            idOper4: [this.oper[3].id, Validators.compose([Validators.required, Validators.minLength(1)])],

            CalificacionOper1: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
            CalificacionOper2: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
            CalificacionOper3: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
            CalificacionOper4: ['', Validators.compose([Validators.pattern(/^[0-9]+$/)])],
          });
          this.ocultar1 = true;
          this.divoper1 = true;
          this.divoper2 = true;
          this.divoper3 = true;
          this.divoper4 = true;
        }
      } else {
      }
    }, (error) => {
      console.log(error);
    });

  }

  GuardarCalificacion(){
    this.ServiceSqlite.GuardarCalificacionOperFinal(this.FormUpdateSiembra.value).then((data: any) => {
      if (data === '0') {
        //this.AlertDatosVacios();
      } else {
        this.ServiceSqlite.GuardarOperarioCalificacion(this.FormUpdateSiembra.value).then((data: any) => {
          if (data){
            //this.AlertDatosGuardados();
            //this.IniciarSiembra.reset();
          }
        }, (error) => {
          console.log(error);
        });
      }
    }, (error) => {
      console.log(error);
    });
  }

}
