import { Component, OnInit, OnDestroy } from '@angular/core'
import { MatTableDataSource } from "@angular/material/table";  
//import { EStore } from '@fireflysemantics/slice';  
//import { Observable } from 'rxjs';  
//import { untilDestroyed } from 'ngx-take-until-destroy';  
//import { untilDestroyed } from '@ngneat/until-destroy';

// Ejemplo copiado de:  
// https://stackblitz.com/edit/angular-minimal-material-table-action-buttons?file=src%2Fapp%2Fapp.component.css,src%2Fapp%2Fapp.component.ts

/**
 * The Slice Keys
 */
const enum TodoSliceEnum {
  COMPLETE = "Complete",
  INCOMPLETE = "Incomplete"
}

class Todo {
  id!: string;
  nombre!: string; 
  peso!: number; 
  descripcion!: string; 
  completed!: boolean;  
}

const todos: Todo[] = [
  { id: '123', nombre: 'HENRY J', peso: 81.1, descripcion: 'Complete me!', completed: false },
  { id: '456', nombre: 'PULGAR BLANCO', peso: 55.3, descripcion: 'Done!', completed: true },
  { id: '789', nombre: 'OSMAN MATHIAS', peso: 37.1, descripcion: 'Complete me!', completed: false }]

//const todos2: Todo[] = [{ id: '321', description: 'Done!', completed: true }]

@Component({
  selector: 'app-pruebame',
  templateUrl: './pruebame.component.html',
  styleUrls: ['./pruebame.component.css']
})

export class PruebameComponent implements OnInit, OnDestroy {

  dataSource = new MatTableDataSource<Todo>(todos); 
  displayedColumns:string[] =  ['id', 'nombre','peso','descripcion','actions']; 

  ngOnInit(): void {

    /*
    this.todoStore.addSlice(todo => todo.completed, TodoSliceEnum.COMPLETE)    
    this.todoStore.addSlice(todo => !todo.completed, TodoSliceEnum.INCOMPLETE)

    const self = this;
    this.dataSource = new MatTableDataSource(todos)

    this.todoStore.postA(todos)
    this.todos$ = this.todoStore.observe()
    this.todos$.pipe(untilDestroyed(this)).subscribe(todos=>{
        console.log("Setting data to:", todos)
        self.dataSource.data = todos
    })
    setTimeout( ()=>{ self.todoStore.postA(todos2) }, 2000)
    */   
  }
  ngOnDestroy(): void {
  }

  eliminar( id : string ) {
    console.log("Elimnar este Item: "+id+"********");
  }

}
