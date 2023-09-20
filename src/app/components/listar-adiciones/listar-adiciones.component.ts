import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AdicionService } from 'src/app/servicios/adicion.service';
import { Adicion } from 'src/modelos/Adicion';

// https://material.angular.io/components/table/overview 
// iniciar ejercicio---------------------------------------------------------
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
// terminar ejercicio--------------------------------------------------------------

@Component({
  selector: 'app-listar-adiciones',
  templateUrl: './listar-adiciones.component.html',
  styleUrls: ['./listar-adiciones.component.css']
})

export class ListarAdicionesComponent implements OnInit {

  displayedColumns: string[] = ['col-id', 'col-fecha', 'col-descripcion', 'col-vida_util', 'col-valor_adicion', 'col-accion'];
  dataSource = new MatTableDataSource<Adicion>([]);  

  adiciones: Adicion[] = [];  
  codigo_activo = "";  
  descripcion = "";    

  constructor( private _adicion: AdicionService, private route: ActivatedRoute )  {} 

  ngOnInit(): void {
    this.codigo_activo = this.route.snapshot.params['codigo_activo']; 
    this.getAdiciones( this.codigo_activo );  
    this.descripcion = this.route.snapshot.params['descripcion']; 
  }

  //--------------------------------------------------------------------
  private getAdiciones( codigo_activo: string ) {
    this._adicion.getAdiciones(codigo_activo).subscribe( response => {
      this.adiciones = response;  
      this.dataSource.data = response;  
      //console.log( response ); 
    } ); 
  } // getAdiciones(). 


  //--------------------------------------------------------------------
  detalle() {
    console.log('Display detalle de la adicion!'); 
  }

  //--------------------------------------------------------------------
  editar() {
    console.log('Editar adicion!'); 
  }

  //--------------------------------------------------------------------
  eliminar() {
    console.log('Eliminae adicion!');  
  }

}
