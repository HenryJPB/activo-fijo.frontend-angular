/*
  En Bqto, 24-08-2023 09:03   
  --------
  RECUERDA:
  -------- 
  En este proyecto, AngularMaterial y BootStrap fueron instalados con:
  - npm install Angular/Material.
  - npm install Angular/Bootstrap 
  ( checa la sintaxis del comando correctamente en la respectiva pag web ) 
  - FormControl fue agregado manualmente.  
  - Despues de instalar Angular/Material muchos modulos de libreia fueron agrgados manualmente de forma 
    posterior en la medida q fueron requeridos, ejemplo: 
      - MatButtonModule
      - MatCheckbox
      - FormsModule, 
      etc.
*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';  
import { MatCheckboxModule}  from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
// 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';   
import { HttpClientModule } from '@angular/common/http';
// Instalar FormControl, checa 👇.
// https://medium.com/@tossedrichi16/formcontrol-angular-reactive-forms-i-839a48b49640 

/* **COMPONENTES ** */
import { ListarArticulosComponent } from './components/listar-articulos/listar-articulos.component';
import { PruebameComponent } from './components/pruebame/pruebame.component';
import { ListarActivosComponent } from './components/listar-activos/listar-activos.component';
import { ListarUbicacionesComponent } from './components/listar-ubicaciones/listar-ubicaciones.component';
import { HeaderComponent } from './compartido/header/header.component';
import { FooterComponent } from './compartido/footer/footer.component';
import { PagBienvenidaComponent } from './components/pag-bienvenida/pag-bienvenida.component';
import { UploadImagenComponent } from './components/upload-imagen/upload-imagen.component';
import { DetalleActivoComponent } from './components/detalle-activo/detalle-activo.component';
import { ActualizarActivoComponent } from './components/actualizar-activo/actualizar-activo.component';
import { CrearActivoComponent } from './components/crear-activo/crear-activo.component';
import { ListarAdicionesComponent } from './components/listar-adiciones/listar-adiciones.component';
import { DetalleAdicionComponent } from './components/detalle-adicion/detalle-adicion.component';
import { CrearAdicionComponent } from './components/crear-adicion/crear-adicion.component';
import { ActualizarAdicionComponent } from './components/actualizar-adicion/actualizar-adicion.component';
import { CrearUbicacionComponent } from './components/crear-ubicacion/crear-ubicacion.component';
import { ActualizarUbicacionComponent } from './components/actualizar-ubicacion/actualizar-ubicacion.component';
import { DetalleUbicacionComponent } from './components/detalle-ubicacion/detalle-ubicacion.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarArticulosComponent,
    PruebameComponent,
    ListarActivosComponent,
    ListarUbicacionesComponent,
    HeaderComponent,
    FooterComponent,
    PagBienvenidaComponent,
    UploadImagenComponent,
    DetalleActivoComponent,
    ActualizarActivoComponent,
    CrearActivoComponent,
    ListarAdicionesComponent,
    DetalleAdicionComponent,
    CrearAdicionComponent,
    ActualizarAdicionComponent,
    CrearUbicacionComponent,
    ActualizarUbicacionComponent,
    DetalleUbicacionComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule, 
    MatButtonModule,
    MatCheckboxModule,   
    MatPaginatorModule,
    HttpClientModule,
    ReactiveFormsModule,  
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule, 
    FormsModule, 
    MatRippleModule,
    MatDatepickerModule, 
    MatNativeDateModule,   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
