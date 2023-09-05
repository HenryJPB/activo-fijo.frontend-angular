import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarArticulosComponent } from './components/listar-articulos/listar-articulos.component';
import { PruebameComponent } from './components/pruebame/pruebame.component';
import { ListarActivosComponent } from './components/listar-activos/listar-activos.component';
import { ListarUbicacionesComponent } from './components/listar-ubicaciones/listar-ubicaciones.component';
import { PagBienvenidaComponent } from './components/pag-bienvenida/pag-bienvenida.component';
import { UploadImagenComponent } from './components/upload-imagen/upload-imagen.component';

const routes: Routes = [
  { path: '', component: PagBienvenidaComponent },
  { path: 'pag-bienvenida', component: PagBienvenidaComponent },
  { path: 'listar-activos', component: ListarActivosComponent },
  { path: 'listar-articulos', component: ListarArticulosComponent }, 
  { path: 'listar-ubicaciones', component: ListarUbicacionesComponent }, 
  { path: 'upload-imagen', component: UploadImagenComponent },    
  { path: 'pruebame', component: PruebameComponent }, 
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
/*
// Componentes: ( Bqto: 06-03-2023 ) tomados de mi proyecto trabajadores-frontend
const routes: Routes = [
  { path: '', component: ListarTrabajadoresComponent },
  { path: 'trabajadores', component: ListarTrabajadoresComponent },
  { path: 'crear-trabajador', component: CrearTrabajadorComponent}, 
  { path: 'editar-trabajador/:id', component: ActualizarTrabajadorComponent },
  { path: 'detalles-trabajador/:id', component: TrabajadorDetallesComponent },
  { path: 'print-tabla-html', component: PrintTablaHtmlComponent },  
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
*/

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
