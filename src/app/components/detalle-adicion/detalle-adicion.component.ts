import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdicionService } from 'src/app/servicios/adicion.service';
import { Adicion } from 'src/modelos/Adicion';

@Component({
  selector: 'app-detalle-adicion',
  templateUrl: './detalle-adicion.component.html',
  styleUrls: ['./detalle-adicion.component.css']
})

export class DetalleAdicionComponent implements OnInit {

  adicion? : Adicion;    
  codigo_activo = "";  
  descripcion = "";  

  constructor( private _adicion: AdicionService, private route : ActivatedRoute ) {} 

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']; 
    this.codigo_activo = this.route.snapshot.params['codigo_activo']; 
    this.descripcion = this.route.snapshot.params['descripcion']; 
    //console.log('*********id, cod_activo, descripcion = '+id+', '+this.codigo_activo+', '+this.descripcion+'********' )
    this.getAdicion( this.codigo_activo, id );   
    // console.log( this.adicion );  // atencion: 'NOTA *1'
    //  NOTA *1: A este punto 'this.adicion' posee datos de informacion, sin embargo por 'console.log' imprime valor 'undefined' .... Pero no hay q preocuparse, todo en orden en el archivo 'html' 👍 ✔️   
  }

  //--------------------------------------------------------------------------------
  getAdicion( codigo_activo: string, id: number ) { 
    this._adicion.getAdicionByCodigoActivoAndId(codigo_activo,id).subscribe( response =>{
      this.adicion = response;  
     //console.log("response: "); // 👍 ✔️ 
     //console.log( response );   // 👍 ✔️ 
    } ); 
  } // getAdicion().

} // export class DetalleAdicionComponent 
