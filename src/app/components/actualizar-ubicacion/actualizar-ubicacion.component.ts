import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UbicacionService } from 'src/app/servicios/ubicacion.service';
import { Ubicacion } from 'src/modelos/Ubicacion';

const UBICACION_INI: Ubicacion = {codigo_ubic:'',descripcion:''}

@Component({
  selector: 'app-actualizar-ubicacion',
  templateUrl: './actualizar-ubicacion.component.html',
  styleUrls: ['./actualizar-ubicacion.component.css']
})

export class ActualizarUbicacionComponent implements OnInit {

  ubicacion = UBICACION_INI;   
  ubicacionForm! : FormGroup;  

  constructor( private fb: FormBuilder, private _ubicacion : UbicacionService, private route : ActivatedRoute,
                  private router : Router ) { 
    this.ubicacionForm = this.fb.group({
      codigo_ubic: [this.ubicacion.codigo_ubic,Validators.required],
      descripcion: [this.ubicacion.descripcion,Validators.required]
    });   
  }

  ngOnInit(): void {
    const codigo_ubic = this.route.snapshot.params['codigo_ubic'];  
    this.getUbicacion( codigo_ubic ); 
  }

  //--------------------------------------------------------------------------
  getUbicacion( codigo_ubic: string ) {
    this._ubicacion.getUbicacionCod( codigo_ubic ).subscribe( response => {
      this.ubicacion = response;  
      //console.log( response );  
    });   
  } // getUbicacion() 

  //--------------------------------------------------------------------------
  guardar( ubicacion : Ubicacion ) {
    //console.log( ubicacion );  
    this._ubicacion.guardar( ubicacion ).subscribe( response => {
      this.retornar();    
    }  );  
  }  // guardar() 

  //--------------------------------------------------------------------------
  retornar() {
    this.router.navigate( ['listar-ubicaciones'] );  
   } // retornar() 

}
