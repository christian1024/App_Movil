import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LecturaRecibioComponent} from "./lectura-recibio/lectura-recibio.component";
import {LecturaInicioSiembraComponent} from "./lectura-inicio-siembra/lectura-inicio-siembra.component";
import {LecturaFinSiembraComponent} from "./lectura-fin-siembra/lectura-fin-siembra.component";
import {LecturaCalidadSiembraComponent} from "./lectura-calidad-siembra/lectura-calidad-siembra.component";
import {LecturaConfirmacionSiembraComponent} from "./lectura-confirmacion-siembra/lectura-confirmacion-siembra.component";
import {LecturaRechazoSiembraComponent} from "./lectura-rechazo-siembra/lectura-rechazo-siembra.component";
import {PruebaPage} from "./prueba/prueba.page";

const routes: Routes = [
  {
    path: '',
    /*redirectTo: 'folder/Inbox',
    pathMatch: 'full'*/
    component: LecturaRecibioComponent
  },
  /*{
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }*/
  {
    path: 'LecturaRecibido',
    component: LecturaRecibioComponent
  },
  {
    path: 'LecturaInicioSiembra',
    component: LecturaInicioSiembraComponent
  },
  {
    path: 'LecturaFinSiembra',
    component: LecturaFinSiembraComponent
  },
  {
    path: 'LecturaCalidadSiembra',
    component: LecturaCalidadSiembraComponent
  },
  {
    path: 'LecturaConfirmacionSiembra',
    component: LecturaConfirmacionSiembraComponent
  },
  {
    path: 'LecturaRechazo',
    component: LecturaRechazoSiembraComponent
  },
  {
    path: 'pageprueba',
    //loadChildren: () => import('./prueba/prueba.module').then( m => m.PruebaPageModule)
    component:PruebaPage
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
