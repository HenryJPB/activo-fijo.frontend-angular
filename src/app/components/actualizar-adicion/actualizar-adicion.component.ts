import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdicionService } from 'src/app/servicios/adicion.service';
import { Adicion } from 'src/modelos/Adicion';

// Valores constantes: 
const ADICION_INI : Adicion = { id: 0, codigo_activo: '', fecha: new Date(), descripcion: '', vida_util: 0, valor_adicion: 0  };  

@Component({
  selector: 'app-actualizar-adicion',
  templateUrl: './actualizar-adicion.component.html',
  styleUrls: ['./actualizar-adicion.component.css']
})

export class ActualizarAdicionComponent implements OnInit{

  adicion = ADICION_INI;   
  adicionForm! : FormGroup;
  param_id = 0;   
  param_codigo_activo = "";
  param_descripcion = "";    

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
      this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy .. doc: https://stackoverflow.com/questions/55721254/how-to-change-mat-datepicker-date-format-to-dd-mm-yyyy-in-simplest-way 
    } // constructor().  

  //---------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.param_id = this.route.snapshot.params['id'];   
    this.param_codigo_activo = this.route.snapshot.params['codigo_activo'];
    this.param_descripcion = this.route.snapshot.params['descripcion'];    
    this.getAdicion(  this.param_codigo_activo, this.param_id );   
  }

  //----------------------------------------------------------------------------------------
  getAdicion( codigo_activo: string, id: number ) {
    this._adicion.getAdicionByCodigoActivoAndId( codigo_activo, id ).subscribe(  response => { 
      this.adicion = response;  
    });
  } //  getAdicion() 

  //----------------------------------------------------------------------------------------
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

}  // export class ActualizarAdicionComponent 
