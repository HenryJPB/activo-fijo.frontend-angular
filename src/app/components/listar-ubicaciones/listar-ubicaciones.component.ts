import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UbicacionService } from 'src/app/servicios/ubicacion.service';
import { Ubicacion } from 'src/modelos/Ubicacion';

// Check: https://www.youtube.com/watch?v=odzjhkUgZuM
//const UBICACION_DATA: Ubicacion[] = [];
// Ejemplo:   
const UBICACION_DATA: Ubicacion[] = [
  {codigo_ubic:'INF-ALM-01',descripcion:'ALMACEN INFORMATICA ESTANTE 01'}
];


/* Class is using Angular features but is not decorated. Please add an explicit Angular decorator.(-992007)*/ 
@Component({
  selector: 'app-listar-ubicaciones',
  templateUrl: './listar-ubicaciones.component.html',
  styleUrls: ['./listar-ubicaciones.component.css']
})

export class ListarUbicacionesComponent implements OnInit {

  //ubicacion: Ubicacion = new Ubicacion;  
  ubicaciones: Ubicacion[] = [];  

  displayedColumns: string[] = ['codigo_ubic', 'descripcion', 'actions'];
  dataSource = new MatTableDataSource<Ubicacion>([]);

  // https://medium.com/@tossedrichi16/formcontrol-angular-reactive-forms-i-839a48b49640 👇 
  inputFiltro : FormControl = new FormControl('');   

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  constructor( private _ubicacion : UbicacionService ) {} 

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.getUbicaciones();  
  }

  private getUbicacionesI() {
    //this._ubicacion.getUbicaciones().subscribe( registro=>{
    //  this.ubicaciones = registro;
      //console.log("Mis ubicaciones: "+this.ubicaciones+"****");
      //console.log("Cod ubic="+this.ubicacion.codigo_ubic+"****");  // Error !!!
      //console.log("DescripUbic="+this.ubicacion.descripcion+"*******");  // Error!!!
    //} ) 
  }

  private getUbicaciones() {
    //this.dataSource.data = [{codigo_ubic:'DES-INF-01',descripcion:'LAPTOP COMPAQ PRESARIO Q10 24MG'}];   
    this._ubicacion.getUbicaciones().subscribe( 
      response=>{
        //console.log( "response="+response+"*****");  // Salida = [object Object],[object Object], ... [object Object]
        this.dataSource.data = response;   
      }
    ); 
    //console.log( "DataSource=" + this.dataSource.data ); 
  }

  filtrar() {
    var x = this.inputFiltro.value;  
    if (x === undefined || x === null ||  x=== '' ) {    // TODO
      //console.log("Variable is either null or undefined");
      this._ubicacion.getUbicaciones().subscribe( datosResponse => {
        this.ubicaciones = datosResponse;  
        //console.log("Activos: "+this.activos+"****");   // Display registros tipo object,..[object Object],...
        //console.log("Filtro nulo, deberia desplegar todos los records,...")
        this.dataSource.data = datosResponse;  
      });  
    } else {
      this._ubicacion.getUbicacionesLike( x ).subscribe( datosResponse => {
        this.ubicaciones = datosResponse;  
        //console.log("Activos: "+this.activos+"****");   // Display registros tipo object,..[object Object],...
        //console.log("Dentro de else filtro NO nulo")
        this.dataSource.data = datosResponse;
      } ); 
    }
  }  // filtrar()

  editar( codigo_ubic : number ) {
    console.log("Editar registro No.: "+codigo_ubic+"*****");  
  }

  detalle( descripcion : string ) {
    console.log("Ver detalle del registro: "+descripcion+"*****");  
  }

  eliminar( descripcion : string ) {
    console.log("Eliminar a: "+descripcion+"*****");  
  }

}  // class ListarUbicacionesComponent
