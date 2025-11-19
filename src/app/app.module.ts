import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LecturaRecibioComponent} from "./lectura-recibio/lectura-recibio.component";
import {LecturaInicioSiembraComponent} from "./lectura-inicio-siembra/lectura-inicio-siembra.component";
import {LecturaFinSiembraComponent} from "./lectura-fin-siembra/lectura-fin-siembra.component";
import {LecturaConfirmacionSiembraComponent} from "./lectura-confirmacion-siembra/lectura-confirmacion-siembra.component";
import {LecturaCalidadSiembraComponent} from "./lectura-calidad-siembra/lectura-calidad-siembra.component";
import {LecturaRechazoSiembraComponent} from "./lectura-rechazo-siembra/lectura-rechazo-siembra.component";
import {SQLite} from '@ionic-native/sqlite/ngx';
import {HttpClientModule} from '@angular/common/http';
import {SqliteService} from "./Providers/Sqlite/sqlite.service";
import {PruebaPage} from "./prueba/prueba.page";
import {ConexionhttpService} from "./Providers/http/conexionhttp.service";

@NgModule({
  declarations: [
    AppComponent,
    LecturaRecibioComponent,
    LecturaInicioSiembraComponent,
    LecturaFinSiembraComponent,
    LecturaConfirmacionSiembraComponent,
    LecturaCalidadSiembraComponent,
    LecturaRechazoSiembraComponent,
    PruebaPage,

  ],
  entryComponents: [
    LecturaRecibioComponent,
    LecturaInicioSiembraComponent,
    LecturaFinSiembraComponent,
    LecturaConfirmacionSiembraComponent,
    LecturaCalidadSiembraComponent,
    LecturaRechazoSiembraComponent,
    PruebaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    SQLite,
    //SQLiteObject,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    SqliteService,
    ConexionhttpService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
