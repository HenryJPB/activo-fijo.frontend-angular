import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { Grupo } from 'src/modelos/Grupo';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private ip_backend = environment.ip_backend;   
  // private baseURL = "http://localhost:8090/api";  
  // private baseURL = "http://desica.gestion-act-fijos:8090/api";  
  private baseURL = "http://"+this.ip_backend+":8090/api";  

  constructor( private _httpClient : HttpClient ) { } 

  //-----------------------------------------------------------------------
  getGrupo():Observable<Grupo[]> {
    const URL = this.baseURL + "/grupo"; 
    return this._httpClient.get<Grupo[]>(URL);    
  }

}  // export class GrupoService 
