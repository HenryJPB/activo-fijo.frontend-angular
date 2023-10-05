import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UbicacionService } from 'src/app/servicios/ubicacion.service';
import { Ubicacion } from 'src/modelos/Ubicacion';

@Component({
  selector: 'app-detalle-ubicacion',
  templateUrl: './detalle-ubicacion.component.html',
  styleUrls: ['./detalle-ubicacion.component.css']
})

export class DetalleUbicacionComponent implements OnInit {

  ubicacion! : Ubicacion; 

  constructor( private _ubicacion : UbicacionService, private route : ActivatedRoute  ) { 
  }

  ngOnInit(): void {
    const codigo_ubic = this.route.snapshot.params['codigo_ubic'];  
    this.getUbicacion( codigo_ubic ); 
  }

  //--------------------------------------------------------------------------
  getUbicacion( codigo_ubic: string ) {
    this._ubicacion.getUbicacionCod( codigo_ubic ).subscribe( response => {
      this.ubicacion = response;  
    });   
  } // getUbicacion() 

}
