import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActivoService } from 'src/app/servicios/activo.service';
import { Activo } from 'src/modelos/Activo';
import { Ubicacion } from 'src/modelos/Ubicacion';
import { UbicacionService } from '../../servicios/ubicacion.service';

const mi_imagen : any = [];  
const ACTIVO_DATA: Activo[] = [
  { id:0, codigo_activo:'INF-PC-01',ubicacion:{codigo_ubic:'INFORMATICA',descripcion:'INFORMATICA'},descripcion:'PC INFORMATICA GENERICO 01',imagen : mi_imagen, nro_compra:'S/N',marca:'S/M',modelo:'DESKTOP',serial:'123456789',vida_util: 0, valor_inicial: 0, valor_rescate: 0, valor_libro: 0, depre_anual : 0, depre_acum : 0, observacion: '*importante*', desincorporado:0 }
];
const ACTIVO : Activo = { id:0, codigo_activo:'INF-PC-01',ubicacion:{codigo_ubic:'INFORMATICA',descripcion:'INFORMATICA'},descripcion:'PC INFORMATICA GENERICO 01',imagen : mi_imagen, nro_compra:'S/N',marca:'S/M',modelo:'DESKTOP',serial:'123456789',vida_util: 0, valor_inicial: 0, valor_rescate: 0, valor_libro: 0, depre_anual : 0, depre_acum : 0, observacion: '*importante*', desincorporado:0 }

@Component({
  selector: 'app-detalle-activo',
  templateUrl: './detalle-activo.component.html',
  styleUrls: ['./detalle-activo.component.css']
})

export class DetalleActivoComponent implements OnInit {

  id : number = 0;  
  codigo_ubic : string = "";  
  //activo? : Activo = ACTIVO;  // fino 💪   
  activo? : Activo;   
  ubicacion? : Ubicacion;  
  activoForm? : FormGroup;  
  public imagenes : any = [];  
  public imgPrevisualizacion! : string;

  constructor( private fb: FormBuilder, private _activo: ActivoService, 
    private _ubicacion : UbicacionService, private route : ActivatedRoute  ) {}

  ngOnInit(): void {
    this.id =  this.route.snapshot.params['id'];
    this.codigo_ubic =  this.route.snapshot.params['codigo_ubic'];
    this.getActivoPorId( this.id );  
    //console.log( this.id );
    //console.log( this.codigo_ubic );
    //console.log( this.activo?.ubicacion.descripcion ); // 'undefined' ????????
    this.getUbicacionPorCod(this.codigo_ubic);  
    //  
    /*
    this._activo.getActivoPorId(this.id).subscribe( response =>{
      this.activo = response;   
      //this.ubicacionDat = new Ubicacion( response.ubicacion.codigo_ubic, response.descripcion );  
      console.log("begin detalle-activo: ");
      console.log( this.activo );   
      console.log("Ubicacion???????????????????:"); 
      console.log( this.activo.ubicacion.descripcion );  //  Error 👎
      console.log("fin detalle-activo: ");
      console.log(JSON.stringify(response));
      //this.activo = JSON.stringify(response);   // Error 👎
      } );
      */
    //
    /* No funciona ???????????????? Sujeto a revision!! 
    ( async () => {
      await this._activo.getActivoPorId(this.id).subscribe( response =>{
        this.activo = response; 
        console.log("Ubicacion???????????????????:"); 
        console.log( this.activo.ubicacion.descripcion ); 
      } );  
      })  (); 
    */ 
  }

  //----------------------------------------------------------------------------------------
  getActivoPorId( id:number ) {
    this._activo.getActivoPorId(id).subscribe( response => {
        this.activo = response;  
        //console.log( this.activo.ubicacion.descripcion ); // Error!!!! ?????
        //console.log( this.activo.descripcion ); //   fisno 💪 
        //---------------------------------------------------------------------------
        // *convertir a base64*
        //---------------------------------------------------------------------------
        const img = response.imagen;  
        //console.log( a[0],a[1],a[2] ); 
        //console.log( a.length );  
        // https://stackoverflow.com/questions/14915058/how-to-display-binary-data-as-image-extjs-4 
        //var srcBase64 = "data:image/jpeg;base64," + btoa(atob("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8H8hYDwAFegHS8+X7mgAAAABJRU5ErkJggg=="));
        //var str1 = this.arrayCollectionToObject( a ); // ???????????
        // 
        //console.log( a.join("") );     // Error !!!
        //
        var s = '';
        var len = img.length;  
        for (var i = 0; i < len; i++) {
            //s += String.fromCharCode( a[ i ] );   // error!!!
            s +=  img[ i ];
        }
        //console.log("Array s="); 
        //console.log( s ); 
        //var srcBase64 = "data:image/jpeg;base64," + s ); // as '.jpeg'  // Error !!!
        var srcBase64 = "data:image/jpeg;base64," + btoa(atob( s ) );      // as '.jpeg'  💪
        //var srcBase64 = "data:image/jpeg;base64," + btoa(atob( str2 )  );      // as '.jpeg'  💪
        //var srcBase64 = "data:image/png;base64," + btoa(atob( s ));     // or '.png'   💪
        this.imgPrevisualizacion = srcBase64;   
    } );  
  } // getActivoPorId(). 

  //----------------------------------------------------------------------------------------
  getUbicacionPorCod( codigo_ubic : string) {
    this._ubicacion.getUbicacionCod( codigo_ubic ).subscribe( response => {
      this.ubicacion = response;  
    });  
  }

} // export class DetalleActivoComponent 
