import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ubicacion } from 'src/modelos/Ubicacion';
import { UbicacionService } from '../../servicios/ubicacion.service';
import { ActivatedRoute, Router } from '@angular/router';

const UBICACION_INI : Ubicacion = { codigo_ubic : '', descripcion : '' }

@Component({
  selector: 'app-crear-ubicacion',
  templateUrl: './crear-ubicacion.component.html',
  styleUrls: ['./crear-ubicacion.component.css']
})

export class CrearUbicacionComponent implements OnInit {

  ubicacion = UBICACION_INI;  
  //ubicacionForm : FormGroup | undefined; // Pilas -> Error!!
  ubicacionForm : FormGroup;  
  
  constructor(  private fb: FormBuilder, private _ubicacion: UbicacionService, 
    private route : ActivatedRoute, private router : Router ) 
  {

    this.ubicacionForm = this.fb.group({ 
     codigo_ubic: [this.ubicacion.codigo_ubic,Validators.required], 
     descripcion: [this.ubicacion.descripcion,Validators.required]
    }); 
    
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  //------------------------------------------------------------------------
  guardar( ubicacion : Ubicacion ) {
    //console.log('Guardar!. This 👇 registro'); 
    //console.log( ubicacion );   
    this._ubicacion.guardar( ubicacion ).subscribe( response => {
      this.retornar();  
    } ); 
  } // guardar()

  //-------------------------------------------------------------
  retornar() {
    this.router.navigate(["/listar-ubicaciones"]); 
  }  // retornar().  

}  // export class CrearUbicacionComponent
 