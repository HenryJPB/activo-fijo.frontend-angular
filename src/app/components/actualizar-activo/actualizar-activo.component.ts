import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivoService } from 'src/app/servicios/activo.service';
import { GrupoService } from 'src/app/servicios/grupo.service';
import { LibHpService } from 'src/app/servicios/lib-hp.service';
import { UbicacionService } from 'src/app/servicios/ubicacion.service';
import { Activo } from 'src/modelos/Activo';
import { Grupo } from 'src/modelos/Grupo';
import { Ubicacion } from 'src/modelos/Ubicacion';
import Swal from 'sweetalert2';

const ACTIVO_INI : Activo =  { id:0, codigo_activo:'INF-PC-01',grupo:'',ubicacion:{codigo_ubic:'INFORMATICA',descripcion:'INFORMATICA'},descripcion:'PC INFORMATICA GENERICO 01',imagen: [0] ,nro_compra:'S/N',marca:'S/M',modelo:'DESKTOP',serial:'123456789',vida_util: 0, valor_inicial: 0, valor_rescate: 0, valor_libro: 0, depre_anual : 0, depre_acum : 0, observacion: '*importante*', desincorporado:0 }

const GRUPO_INI : Grupo = { id:0, descripcion : '', cuenta_abono : '', cuenta_cargo: '', tipo_activo: '' }

const ACTIVO_DATA: Activo[] = [
  { id:0, codigo_activo:'INF-PC-01',grupo:'MOBILIARIO Y EQUIPO DE OFICINA',ubicacion:{codigo_ubic:'INFORMATICA',descripcion:'INFORMATICA'},descripcion:'PC INFORMATICA GENERICO 01',imagen: [] ,nro_compra:'S/N',marca:'S/M',modelo:'DESKTOP',serial:'123456789',vida_util: 0, valor_inicial: 0, valor_rescate: 0, valor_libro: 0, depre_anual : 0, depre_acum : 0, observacion: '*importante*', desincorporado:0 }
];

@Component({
  selector: 'app-actualizar-activo',
  templateUrl: './actualizar-activo.component.html',
  styleUrls: ['./actualizar-activo.component.css']
})

export class ActualizarActivoComponent implements OnInit {

  //activo! : Activo;     // '!' va a tomar cualquier valor excepto 'null' or 'undefined'   
  activo = ACTIVO_INI;  
  arr_grupo : Grupo[] = []; 
  grupo = GRUPO_INI;    
  ubicacion = new Ubicacion("","");  
  activoForm! : FormGroup;

  ubicacionSelect : Ubicacion = new Ubicacion("",""); 
  ubicacionSelectControl = new FormControl( this.ubicacionSelect ); 
  ubicaciones : Ubicacion[]=[];   
  seleccionado : string | undefined;  

  imagenes : any = [];  
  imgPrevisualizacion! : string;

  constructor( private fb: FormBuilder, private _activo: ActivoService, private _grupo: GrupoService, 
    private _ubicacion : UbicacionService, private route : ActivatedRoute,
    private _libHp : LibHpService, private router : Router  ) {

    this.activoForm = this.fb.group({
      codigo_activo: [this.activo.codigo_activo,Validators.required],
      grupo:[this.activo.grupo,Validators.required],
      descripcion: [this.activo.descripcion,Validators.required],
      // ubicacion: [this.activo.ubicacion,Validators.required],    // Correcto, confirma validacion !!
      ubicacion: [this.activo.ubicacion],
      marca: [this.activo.marca], 
      modelo:[this.activo.modelo], 
      serial:[this.activo.serial],
      valor_inicial: [this.activo.valor_inicial],
      vida_util : [this.activo.vida_util],
      valor_rescate : [this.activo.valor_rescate], 
      observacion: [this.activo.observacion], 
      desincorporado :[this.activo.desincorporado],     
    });

  }  // constructor(). 

  ngOnInit(): void {
   // throw new Error('Method not implemented.');
   // this.activo? = ACTIVO_DATA;    ??????
    const id =  this.route.snapshot.params['id'];
    const codigo_ubic =  this.route.snapshot.params['codigo_ubic'];
    // 
    this.getActivoPorId( id );  
    this.getGrupo();   
    //console.log( id );
    //console.log( codigo_ubic );
    //console.log( this.activo?.ubicacion.descripcion ); // 'undefined' ????????
    this.getUbicacionPorCod( codigo_ubic );  
    this.getUbicaciones();  
    // 
  } // ngOnInit() 

  //---------------------------------------------------------------------------
  getActivoPorId(id: any) {
    this._activo.getActivoPorId(id).subscribe( response=> {
      this.activo = response;   
      //console.log( "1" );
      //console.log( this.activo );
      //console.log( this.activo.ubicacion.descripcion ); // Error!!!! ?????
      //console.log( this.activo.descripcion ); //   fisno 💪 
      //---------------------------------------------------------------------------
      // *convertir a base64*
      //---------------------------------------------------------------------------
      this.imagenes = response.imagen;   
      const img = response.imagen;  
      var s = '';
      var len = img.length;  
      for (var i = 0; i < len; i++) {
          //s += String.fromCharCode( a[ i ] );   // error!!!
          s +=  img[ i ];
      }
      var srcBase64 = "data:image/jpeg;base64," + btoa(atob( s ) );      // as '.jpeg'  💪
      this.imgPrevisualizacion = srcBase64;   
    }); 
  } 

  //--------------------------------------------------------------------
  private getGrupo() {
    this._grupo.getGrupo().subscribe( response => {
      this.arr_grupo = response;  
      //console.log( this.grupo );      
    } ); 
  } // getGrupo

  //---------------------------------------------------------------------------
  getUbicacionPorCod(codigo_ubic: any) {
    this._ubicacion.getUbicacionCod(codigo_ubic).subscribe( response => {
      this.ubicacion = response;   
      this.ubicacionSelect = response;   
    } ); 
  }

  // -------------------------------------------------------------------------------------------------
  capturarImagen( event: Event ) { 
    /*
    console.log( "evento="+event.target );    // error...!!
    console.log( event );    // error...!!
    */   
    // check: 👉 https://stackoverflow.com/questions/59208257/file-input-event-type-in-angular 👇
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    //console.log(files[0]);
    const imagenCapturada = files[0];   
    // --------------------------------------------------------------------------------------------------
    // Convertir archivo imagen en una array de bytes, ...
    // https://stackoverflow.com/questions/66024416/convert-an-image-to-byte-array-in-angular-typescript
    // console.log("imagen capturada="+imagenCapturada);   
    const reader = new FileReader();
    reader.onload = (e: any) => {
         const bytes = e.target.result.split('base64,')[1];   // ** OJO, aqui 👈 esta el piquete
         this.imagenes = bytes;  /**Aqui esta el piquete**/
         // console.log("this.imagenes:");  
         // console.log("this.imagenes 👇 : ");  
         // console.log( bytes );  // 👍
         // console.log( this.imagenes );
    };
    reader.readAsDataURL(imagenCapturada);
    //---------------------------------------------------------------------------------------------------- 
    this._libHp.getBase64(imagenCapturada).then( ( imagen : any ) =>{
      this.imgPrevisualizacion = imagen.base;  
    } );   
  }  //  capturarImagen().

  //-------------------------------------------------------------------------------------
  private getUbicaciones() {
    this._ubicacion.getUbicaciones().subscribe( 
      response=>{
        //console.log( "response="+response+"*****");  // Salida = [object Object],[object Object], ... [object Object]
        this.ubicaciones = response;   
      }
    ); 
  }

  // -------------------------OLD------------------------------------------------
  //--------------------*Testing*------------------------------------------------
  guardarActivoOLD( activo: Activo ) { 
    console.log("*****Update activo.Ini*********");
    console.log( activo  ); 
    console.log("Nueva ubicacion (attr ubicacion): "+this.ubicacion.descripcion );  // sin cambios!!!
    //console.log( activo.ubicacion );                  // 👈 Ubicacion anterior 
    if ( activo.ubicacion === null || activo.ubicacion === undefined ) {   // 👈 NUeva ubicacion. Ambas NO pueden estar nulas o vacias 
      console.log("Ubicacion NULA o UNDEFINED!!  ");  
    } else {
    console.log("Nueva ubicacion (attr activo): "+activo.ubicacion.codigo_ubic );
    console.log("Nueva ubicacion (attr activo): "+activo.ubicacion.descripcion );  
    }
    if ( activo.ubicacion === null || activo.ubicacion === undefined ) {    // Old ubic-
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: ''
      });    
    } 
    console.log("*****Update activo.Fin********");
  } // guardarActivo().  

  //----------------------------------------------------------------------------
  guardar( activo: Activo ) { 
    //console.log("*****Update activo.Ini*********");
    //const id = 0;   // Valor dumy. Remember q este atributo es generada x autoincremento en la BD. 
    // convocar servicio:   
    //this._activo.guardarImagenI(activo).subscribe( registro =>{} );  
    //
    if (  ( activo.ubicacion === null || activo.ubicacion === undefined || activo.ubicacion.codigo_ubic === "" ) &&  ( this.ubicacion === null || this.ubicacion.codigo_ubic === "" ) ) { 
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ATENCION: Ubicacion obligatoria!',
        footer: ''
      });   
    } else {
        if ( activo.ubicacion === null || activo.ubicacion === undefined ) {
          // El usuario no cambio la ubicacion y hay q asignarle la q trae!!
          activo.ubicacion = this.ubicacion;  
        } // if ( activo.ubicacion 
        const desincorporado = activo.desincorporado.toString();  
        if ( desincorporado === "true" || desincorporado === "false" ) {
            //console.log("BOOLEAN: " + desincorporado ); 
            desincorporado === "true" ? activo.desincorporado = 1 : activo.desincorporado = 0   
        } // if ( desincorporado
        //console.log( activo.desincorporado ); 
        /***/
        activo.imagen = this.imagenes;  
        //console.log( "Ativo:" );
        //console.log( activo ); 
        //console.log("Imagen 👇: ");
        //console.log( this.imagenes );   // 👍 ; o, 
        //console.log( activo.imagen );   // 👍 ; o, 
        /***/
        //console.log( activo );          // 👍
        //console.log("Imagen 👇: ");
        //console.log( this.imagenes );   // 👍 ; o, 
        //console.log( activo.imagen );    
        //console.log("Al final esta es la ubicacio="+ activo.ubicacion.codigo_ubic + " " + activo.ubicacion.descripcion );   
        /***/
        //--------------------------------------------------------------------------------------------------------------------
        /* La siguiente rutina NO aplica para la opcion de Actualizar Registro xq este campo debe estar deshabilitado 'OJO'!! 
        const codigo_activo_aux = activo.codigo_activo; 
        this._activo.getActivoPorCodActivo( codigo_activo_aux ).subscribe( response =>{
          if ( response !== null ) {  // 
            console.log(' INTENTAS DUPLICAR codigo_activo'); 
          } else {
            console.log(' Sin rollo codigo_activo fino -- procede a guardar resistro');
          }
        } );  
        */
        //activo.grupo = this.grupo.descripcion;
        //----------------------------------------------------------------------------------------------------------------------
        this._activo.guardar( activo, activo.ubicacion.codigo_ubic ).subscribe( registro =>{
          this.retornar();
        });
        //    
        // console.log( activo );   
        //console.log("*****Update activo.Fin*********");
    } // if-else 
  } // guardarActivo(). 

  //-------------------------------------------------------------
  retornar() {
    this.router.navigate(["/listar-activos"]); 
  }

} // export class.
