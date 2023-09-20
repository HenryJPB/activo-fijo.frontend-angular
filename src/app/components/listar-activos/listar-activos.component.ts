import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ActivoService } from 'src/app/servicios/activo.service';
import { AdicionService } from 'src/app/servicios/adicion.service';
import { Activo } from 'src/modelos/Activo';
import Swal from 'sweetalert2';

// https://www.geeksforgeeks.org/javascript-blob/ 👇    
// const mi_imagen = new Blob(["GeeksForGeeks"],{type : "text/plain"});
const mi_imagen = new Blob(["iniciar var const tipo Blob"],{type : "text/plain"});
const mi_imagen_byte : number[] = [];  
// Check: https://www.youtube.com/watch?v=odzjhkUgZuM 👇
//const UBICACION_DATA: Ubicacion[] = [];
// Ejemplo:  👍 ✔️
/*   
const ACTIVO_DATA: Activo[] = [
  { id:0, codigo_activo:'INF-PC-01',ubicacion:{codigo_ubic:'INFORMATICA',descripcion:'INFORMATICA'},descripcion:'PC INFORMATICA GENERICO 01',imagen:mi_imagen,nro_compra:'S/N',marca:'S/M',modelo:'DESKTOP',serial:'123456789',vida_util: 0, valor_inicial: 0, valor_rescate: 0, valor_libro: 0, depre_anual : 0, depre_acum : 0, observacion: '*importante*', desincorporado:0 }
];
*/
const ACTIVO_DATA: Activo[] = [
  { id:0, codigo_activo:'INF-PC-01',ubicacion:{codigo_ubic:'INFORMATICA',descripcion:'INFORMATICA'},descripcion:'PC INFORMATICA GENERICO 01',imagen:mi_imagen_byte ,nro_compra:'S/N',marca:'S/M',modelo:'DESKTOP',serial:'123456789',vida_util: 0, valor_inicial: 0, valor_rescate: 0, valor_libro: 0, depre_anual : 0, depre_acum : 0, observacion: '*importante*', desincorporado:0 }
];

@Component({
  selector: 'app-listar-activos',
  templateUrl: './listar-activos.component.html',
  styleUrls: ['./listar-activos.component.css']
})

export class ListarActivosComponent implements OnInit {

  activos: Activo[] = [];   

  displayedColumns: string[] = ['codigo_activo','descripcion','ubicacion','actions'];
  /* Probar 👇 eeexxiiiitooo 👍 ✔️
   dataSource = new MatTableDataSource<Activo>(ACTIVO_DATA);
   */ 
  dataSource = new MatTableDataSource<Activo>([]);

  inputFiltro : FormControl = new FormControl('');  
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor( private _activo : ActivoService, private router : Router ) {}

  ngOnInit(): void {  
    this.getActivos(); 
  }

  //--------------------------------------------------------------------
  private getActivos()  {
    this._activo.getActivos().subscribe( datosResponse => {
      this.activos = datosResponse;  
      //console.log("Activos: "+this.activos+"****");   // Display registros tipo object,..[object Object],...
      this.dataSource.data = datosResponse;  
    });  
  }  // getActivos() 

  //--------------------------------------------------------------------
  /*
  filtrarOLD() {

    var x = this.inputFiltro.value;  
    if (x === undefined || x === null) {
      console.log("Variable is either null or undefined");
    } else {
      console.log("Variable is Neither null or undefined");
      if ( x== '' ) {
        console.log("variable filtro='' (vacia) "); 
        this._activo.getActivosLike().subscribe( datosResponse => {
          this.activos = datosResponse;
          this.dataSource.data = datosResponse;
        } );
      }
    }
    console.log("Mi filtro (activos)="+this.inputFiltro.value+"******"); 
    
  }  // filtrarOLD()
  */

  //-------------------------------------------------------------------------
  filtrar() {
    var x = this.inputFiltro.value;  
    if (x === undefined || x === null ||  x=== '' ) {    // TODO
      //console.log("Variable is either null or undefined");
      this._activo.getActivos().subscribe( datosResponse => {
        this.activos = datosResponse;  
        //console.log("Activos: "+this.activos+"****");   // Display registros tipo object,..[object Object],...
        //console.log("Filtro nulo, deberia desplegar todos los records,...")
        this.dataSource.data = datosResponse;  
      });  
    } else {
      this._activo.getActivosLike( x ).subscribe( datosResponse => {
        this.activos = datosResponse;  
        //console.log("Activos: "+this.activos+"****");   // Display registros tipo object,..[object Object],...
        //console.log("Dentro de else filtro NO nulo")
        this.dataSource.data = datosResponse;
      } ); 
    }
  }  // filtrar()

  /*
  detalle( codigo_activo : string, ubicacion : string  ) {
    console.log("Ver detalle del registro: "+codigo_activo+"****ubicacion: "+ubicacion );  
  }
  */ 

  //---------------------------------------------------------------------
  detalle( id:number, codigo_ubic : string ) {
    //console.log("*****detalles*****id="+id+"***codigo_ubic="+codigo_ubic+"*****"); 
    this.router.navigate(['detalle-activo',id,codigo_ubic]); 
    //this.router.navigate(['pruebame']); 
  } 
  
  //---------------------------------------------------------------------
  // https://sweetalert2.github.io/
  //---------------------------------------------------------------------
  eliminar( id:number ) {
    Swal.fire({
      title: 'Seguro?',
      text: "ATENCION: accion no reversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._activo.eliminar(id).subscribe( response => { 
            this.getActivos();   
            Swal.fire(
              'Eliminado!',
              'Registró eliminado.',
              'success'
            ) } );    

      }  // if (result.isConfirmed)
    });   
  }  // eliminarEmpleado().  
  
  //------------------------------------------------------------------------
  editar( id: number, codigo_ubic : string ) {
    //console.log("*****id="+id+"*****ubic="+codigo_ubic+"******");   
    this.router.navigate(['actualizar-activo',id,codigo_ubic]);   
  }

  //------------------------------------------------------------------------
  adicionar( codigo_activo: string, descripcion: string  ) {
    //console.log("activo para adicionar: "+codigo_activo+", ubicado en "+codigo_ubic+"***");   
    this.router.navigate(['listar-adiciones',codigo_activo,descripcion]); 
  }

}
