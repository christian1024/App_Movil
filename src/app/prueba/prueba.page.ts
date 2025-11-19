import { Component, OnInit } from '@angular/core';
import {ConexionhttpService} from "../Providers/http/conexionhttp.service";
import {AlertController, NavController, Platform, ToastController} from '@ionic/angular';
import {SqliteService} from "../Providers/Sqlite/sqlite.service";

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
})
export class PruebaPage implements OnInit {
  private productList: any;
  constructor(
    private http: ConexionhttpService,
    public platform: Platform,
    public SqliteService: SqliteService,

  ) {
    this.platform.ready().then(() => {
    this.cargarusuarios();
  }); }

  ngOnInit() {
  }
  cargarusuarios() {
    this.SqliteService.pruebasqlite().then((data) => {
      this.productList = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }
}
