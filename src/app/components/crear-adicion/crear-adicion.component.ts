import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdicionService } from 'src/app/servicios/adicion.service';
import { Adicion } from 'src/modelos/Adicion';
import { FormControl } from '@angular/forms';

// Valores constantes: 
const ADICION_INI : Adicion = { id: 0, codigo_activo: '', fecha: new Date(), descripcion: '', vida_util: 0, valor_adicion: 0  };  

@Component({
  selector: 'app-crear-adicion',
  templateUrl: './crear-adicion.component.html',
  styleUrls: ['./crear-adicion.component.css']
})

export class CrearAdicionComponent implements OnInit {

  adicion = ADICION_INI;   
  adicionForm! : FormGroup;
  param_codigo_activo = "";
  param_descripcion = "";    
  fecha_aux = new FormControl( new Date(this.adicion.fecha) );  // ?? Ejemplo de uso FormControl. 

  constructor(  private fb: FormBuilder, private _adicion: AdicionService, private route : ActivatedRoute, private dateAdapter: DateAdapter<Date>,
                private router : Router )
   {
    this.adicionForm = this.fb.group({
      id: [this.adicion.id],  // Obligado -> disable el formControl. 
      codigo_activo: [this.adicion.codigo_activo],  // Obligado -> disable el formControl. 
      fecha: [this.adicion.fecha,Validators.required], 
      descripcion: [this.adicion.descripcion,Validators.required], 
      vida_util: [this.adicion.vida_util], 
      valor_adicion: [this.adicion.valor_adicion]
    }); 
    this.param_codigo_activo = this.route.snapshot.params['codigo_activo'];
    this.param_descripcion = this.route.snapshot.params['descripcion'];    
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy .. doc: https://stackoverflow.com/questions/55721254/how-to-change-mat-datepicker-date-format-to-dd-mm-yyyy-in-simplest-way 
    //console.log("p_codigo_acto="+this.param_codigo_activo+" p_descripcion="+this.param_descripcion); 
  } 

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  //------------------------------------------------------------------------
  guardar( adicion: Adicion ) {
    //console.log('Guardar nueva Adicion!!!!. This 👇 registro'); 
    if (  adicion.codigo_activo===null || adicion.codigo_activo==="" || adicion.codigo_activo===undefined ) {
      //console.log('codigo activo es NULA!!!!!!!!!!!!!!!!!!!!!'); 
      adicion.codigo_activo = this.param_codigo_activo;     
    }
    //console.log('fecha_aux='+this.fecha_aux.value);   
    //adicion.fecha = this.fecha_aux.value;  // Error: Sujeto a revision !!   
    //console.log( adicion );  
    // this._adicion.guardarAdicion(adicion);      // Asi NO!!, t volvistes crazy ??'
    //this._activo.guardar( activo, activo.ubicacion.codigo_ubic ).subscribe( registro =>{} ); 
    this._adicion.guardar( adicion ).subscribe( response =>{
      this.retornar();   
    } );   
  } // guardar()

   //-------------------------------------------------------------
   retornar() {
    this.router.navigate(["/listar-adiciones",this.param_codigo_activo,this.param_descripcion]); 
  }

} // export class CrearAdicionComponent 
