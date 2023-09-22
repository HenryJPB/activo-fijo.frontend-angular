import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivoService } from 'src/app/servicios/activo.service';
import { Activo } from 'src/modelos/Activo';
import { Ubicacion } from 'src/modelos/Ubicacion';
import { UbicacionService } from 'src/app/servicios/ubicacion.service';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';


// 
/*
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
*/ 
@Component({
  selector: 'app-upload-imagen',
  templateUrl: './upload-imagen.component.html',
  styleUrls: ['./upload-imagen.component.css'],
  //standalone: true,   // ERROR!!!!
  //imports: [FormsModule, MatFormFieldModule, MatSelectModule, NgFor, MatInputModule],
  //standalone: true,   // ERROR!!!!!
  //imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
})

export class UploadImagenComponent implements OnInit {

  activo : any = Activo;  
  public imagenes : any = [];  
  public imgPrevisualizacion! : string;
  public imgPrevisualizacionBD! : string;   

  //ubicacionSelect : Ubicacion | undefined; 

  ubicaciones : Ubicacion[]=[];   
  seleccionado : string | undefined; 

  //new Option('Option2'); 

  ubicacionSelect : Ubicacion = new Ubicacion("INFORMATICA","DEPARTAMENTO DE INFORMATICA"); 
  // ubicacionSelect = new Option( "INFORMATICA","DEPARTAMENTO DE INFORMATICA"); 
  ubicacionSelectControl = new FormControl( this.ubicacionSelect );    // ?????

  fecha = new FormControl( new Date("2022-09-27") );

  constructor( private sanitizer : DomSanitizer, private _activo : ActivoService, private _ubicacion : UbicacionService,
                 private dateAdapter: DateAdapter<Date> ) {
      this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy .. doc: https://stackoverflow.com/questions/55721254/how-to-change-mat-datepicker-date-format-to-dd-mm-yyyy-in-simplest-way 
  } 

  ngOnInit(): void {
    /* Prueba: exitosa 💪  
    this.ubicaciones.push(new Ubicacion("AAAAAA","AAAAAAAA") );
    this.ubicaciones.push(new Ubicacion("BBBBBB","BBBBBBBB") );
    this.ubicaciones.push(new Ubicacion("CCCCCC","CCCCCCCC") );
    this.ubicaciones.push(new Ubicacion("DDDDDD","DDDDDDDD") );
    this.ubicaciones.push(new Ubicacion("EEEEEE","EEEEEEEE") );
    */ 
    this.getUbicaciones();  
  }

  //-------------------------------------------------------------------------------------
  private getUbicaciones() {
    this._ubicacion.getUbicaciones().subscribe( 
      response=>{
        //console.log( "response="+response+"*****");  // Salida = [object Object],[object Object], ... [object Object]
        this.ubicaciones = response;   
      }
    ); 
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
         //console.log("this.imagenes:");  
         //console.log(bytes); 
    };
    reader.readAsDataURL(imagenCapturada);
    //---------------------------------------------------------------------------------------------------- 
    this.getBase64(imagenCapturada).then( ( imagen : any ) =>{
      this.imgPrevisualizacion = imagen.base;  
      //this.imgPrevisualizacion = imagen.blob;  
      //console.log("metodo: capturarImagen= imagen.parse:");
      //byteArray = convertDataURIToBinary(imagen.base);  
      //console.log("metodo: capturarImagen= imagen.blob 👇:");
      //console.log(imagen);  
    } );   
  }  //  capturarImagen().

/*
const cargarDatos = async () => {
  try{
	  const url = "https://jsonplaceholder.typicode.com/todos/qwe1";
	  const res = await fetch(url);
	  if(res.ok){ 
	    const datos = await res.json();
	    console.log(datos);
	  } else {
	    console.log(res.status); // 404
	  }
  } catch(err) {
    console.log(err)
  }
};
cargarDatos();
*/

  /* --------------------------------------------------------------------------------
  * Ejemplo transcrito de:
  * ¿Cómo SUBIR IMAGEN (ARCHIVO) Tutorial en ANGULAR 11?//Curso Angular desde cero 😎
  * ( Youtube ) https://www.youtube.com/watch?v=8GJgfk1rFUQ 
  * Leifer Mendez
  * --------------------------------------------------------------------------------- */
  /*
  getBase64 = async( $event : any ) => new Promise( ( resolve, reject ) => {
    try {
      const unsafeImage = window.URL.createObjectURL($event); 
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImage); 
      const reader = new FileReader();
      reader.readAsDataURL($event);  
      // **
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result 
        });
      } 
      // **
      reader.onerror = error => {
        resolve({
          blob: $event, 
          image, 
          base : null
        });
      }
      // ***
    } catch( e ) {
      return null;  
    } // try-cath
  } ); // getBase64() 
  */

  //-----------------------------------------------------------------------------------
  getBase64 = async( $event : any ) => new Promise( ( resolve, reject  ) => {
    try {
      const unsafeImage = window.URL.createObjectURL($event); 
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImage); 
      const reader = new FileReader();
      reader.readAsDataURL($event);  
      // **
      reader.onload = () => {
        resolve({
          blob: $event, 
          image, 
          base: reader.result 
        });
      } 
      // **
      reader.onerror = error => {
        resolve({
          blob: $event, 
          image, 
          base : null
        });
      }
      // ***
    } catch( e ) {
      return null;  
    } // try-cath
    return null;  
  } ); // getBase64() 

  //---------------------------------------------------------------
  // ( Youtube ) https://www.youtube.com/watch?v=8GJgfk1rFUQ 
  //---------------------------------------------------------------
  subirArchivo() : any {
    try {
    const formDatos = new FormData();  
    this.imagenes.array.forEach( ( element:any )=> {
        formDatos.append('imagenes',element);
        console.log("metodo: subirArchivo element:"); 
        console.log(element);         
    });
    } catch ( e ) {
      console.log('ERROR',e);   
    } // try-catch
  }  // subirArchivo().

  //----------------------------------------------------------------------
  guardarImagenActivo() {
    const id = 0;   // Valor dumy. Remember q este atributo es generada x autoincremento en la BD. 
    const codigo_activo = "PRUEBA-02";
    const descripcion = "COMPUTADOR DE PRUEBA 02";   
    const ubicacion = new Ubicacion("CONTROL-CALIDAD","DEPARTAMENTO DE CTRL. CALIDAD");  
    // 
    //const imagen  = this.imgPrevisualizacion;   //   Error: Blob
    //const imagen = new Blob([this.imagenes.pop()], { type: 'image/jpeg' });   
    //const blob = new Blob(["Hello, world!"], {type: 'text/plain'});
    //const imagen = new Blob([new Uint8Array(this.imagenes.pop())],{type:"application/octect-binary"});
    //const imagen = new Blob([new Uint8Array(this.imagenes[0])],{type:"application/octect-binary"});  // backend error: Cannot construct instance of `java.sql.Blob` (no Creators, like default constructor, exist): abstract types either need to be mapped to concrete types, have custom deserializer, or contain additional type information
    // 
    //const imagen = number[];  
    const imagen1: number[] = [];  // probando,.. 
    //byteArray = convertDataURIToBinary(imagen.base); 
    const imagen2 = this.imagenes; // 💪
    //
    const nro_compra = "PRUEBA2"; 
    const marca = "GENERICO";  
    const modelo = "GENERICO";  
    const serial = "S/S";  
    //const vida_util  = Number("5");   
    const vida_util  = 15;   
    const valor_inicial = 987;  
    const valor_rescate = 87;  
    const valor_libro = 10;  
    const depre_anual = 5; 
    const depre_acum = 333;  
    const observacion = "PC de PRUEBA2, COLOR: gris, s/DVD.";  
    const desincorporado = 0;  
    //
    const activo = new Activo(id, codigo_activo, descripcion,ubicacion, this.imagenes ,nro_compra, 
      marca, modelo, serial, vida_util, valor_inicial, valor_rescate, valor_libro, depre_anual, 
       depre_acum, observacion, desincorporado );
    console.log("metodo: guardarImagen 👇:");
    console.log("activo to save es: "); 
    console.log(activo);  
    // convocar servicio:   
    this._activo.guardarActivo(activo).subscribe( registro =>{} );  
    //
  } // guardarImagenActivo().
  
  //--------------------------------------------------------------------
  guardarImagenUbic() {
    const u = new Ubicacion("ELIMINAME","OFICINA DE PRUEBA");  
    this._ubicacion.guardarUbicacion(u).subscribe( registro =>{} ); 
  }

  //--------------------------------------------------------------------
  getImagenBD() {
      //var activo : Activo | undefined; 
      var act : any = Activo;   
      var ubi : any = Ubicacion;   
      //this._activo.getActivoPorId(14).subscribe( response => {    // registro # 14 - prueba exitosa 💪   
      this._activo.getActivoPorId(16).subscribe( response => {    // registro # 16 - prueba exitosa 💪   
          //  
          /*
          console.log("response:👇");
          console.log(response);   
          console.log("suscribe _activo.getActivoID... ejecutado"); 
          if ( response!==null ) { 
            console.log("REGISTRO ENCONTRADO"); 
            console.log(response);  
            ubi = response.ubicacion;
            // console.log(response.ubicacion);   // 'undefined' ????????????????????????
            console.log(ubi);                   // undefined ?????????????????? 
          } else {
            console.log("REGISTRO NO ENCONTRADO"); 
          }
          */   
          //  
          /*
          act = response;  
          this.activo = response;
          // act = response; tambien funciona asi, ...  💪 
          console.log("Dentro de .sucribe de getImagenBD....."); 
          console.log( this.activo );
          console.log( response.imagen );  
          */
          //---------------------------------------------------------------------------
          // *convertir a base64*
          //---------------------------------------------------------------------------
          //console.log("ARRAY response.imagen:"); 
          const a = response.imagen;  
          //console.log( a[0],a[1],a[2] ); 
          //console.log( a.length );  
          // https://stackoverflow.com/questions/14915058/how-to-display-binary-data-as-image-extjs-4 
          //var srcBase64 = "data:image/jpeg;base64," + btoa(atob("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8H8hYDwAFegHS8+X7mgAAAABJRU5ErkJggg=="));
          //var str1 = this.arrayCollectionToObject( a ); // ???????????
          // 
          //console.log( a.join("") );     // Error !!!
          //
          var s = '';
          var len = a.length;  
          for (var i = 0; i < len; i++) {
              //s += String.fromCharCode( a[ i ] );   // error!!!
              s +=  a[ i ];
          }
          //console.log("Array s="); 
          //console.log( s ); 
          //var srcBase64 = "data:image/jpeg;base64," + s ); // as '.jpeg'  // Error !!!
          var srcBase64 = "data:image/jpeg;base64," + btoa(atob( s ) );      // as '.jpeg'  💪
          //var srcBase64 = "data:image/jpeg;base64," + btoa(atob( str2 )  );      // as '.jpeg'  💪
          //var srcBase64 = "data:image/png;base64," + btoa(atob( s ));     // or '.png'   💪
          this.imgPrevisualizacionBD = srcBase64;   
          //console.log("srcbase64=");
          //console.log( srcBase64 ); 
          // 
      } );     
  } // getImgenBd().   

  // ?????? -------------------------------------------------------------------------------
  // https://dev.to/d4vsanchez/convertir-un-array-de-objetos-a-un-objeto-en-typescript-1fc2    
  arrayCollectionToObject< T extends { id: S, name: string }, S extends string >(collection: T[] = []) {
    const result = {} as { [K in T['id']]: string };
    for (const item of collection) {
      result[item.id] = item.name;
    }
    return result;
  } // arrayCollectionToObject 

  checkSeleccion( u : Ubicacion ) {
    //const u = this.ubicacionSelectControl;  
    console.log("----------------------------------------------");
    console.log( u ); 
    console.log( "codigo: "+u.codigo_ubic ); 
    console.log("----------------------------------------------");
  } 

}  // export class UploadImagenComponent ...
