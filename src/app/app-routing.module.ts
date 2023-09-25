import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarArticulosComponent } from './components/listar-articulos/listar-articulos.component';
import { PruebameComponent } from './components/pruebame/pruebame.component';
import { ListarActivosComponent } from './components/listar-activos/listar-activos.component';
import { ListarUbicacionesComponent } from './components/listar-ubicaciones/listar-ubicaciones.component';
import { PagBienvenidaComponent } from './components/pag-bienvenida/pag-bienvenida.component';
import { UploadImagenComponent } from './components/upload-imagen/upload-imagen.component';
import { DetalleActivoComponent } from './components/detalle-activo/detalle-activo.component';
import { ActualizarActivoComponent } from './components/actualizar-activo/actualizar-activo.component';
import { CrearActivoComponent } from './components/crear-activo/crear-activo.component';
import { ListarAdicionesComponent } from './components/listar-adiciones/listar-adiciones.component';
import { DetalleAdicionComponent } from './components/detalle-adicion/detalle-adicion.component';
import { CrearAdicionComponent } from './components/crear-adicion/crear-adicion.component';
import { ActualizarAdicionComponent } from './components/actualizar-adicion/actualizar-adicion.component';

const routes: Routes = [
  { path: '', component: PagBienvenidaComponent },
  { path: 'pag-bienvenida', component: PagBienvenidaComponent },
  { path: 'listar-activos', component: ListarActivosComponent },
  { path: 'listar-articulos', component: ListarArticulosComponent }, 
  { path: 'listar-ubicaciones', component: ListarUbicacionesComponent }, 
  { path: 'detalle-activo/:id/:codigo_ubic', component: DetalleActivoComponent }, 
  { path: 'actualizar-activo/:id/:codigo_ubic', component: ActualizarActivoComponent }, 
  { path: 'crear-activo', component: CrearActivoComponent }, 
  { path: 'listar-adiciones/:codigo_activo/:descripcion', component: ListarAdicionesComponent }, 
  { path: 'detalle-adicion/:id/:codigo_activo/:descripcion', component: DetalleAdicionComponent },    
  { path: 'crear-adicion/:codigo_activo/:descripcion', component: CrearAdicionComponent }, 
  { path: 'actualizar-adicion/:codigo_activo/:descripcion/:id', component: ActualizarAdicionComponent},   
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
