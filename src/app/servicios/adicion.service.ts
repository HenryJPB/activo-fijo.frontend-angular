import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adicion } from 'src/modelos/Adicion';

@Injectable({
  providedIn: 'root'
})
export class AdicionService {

  private baseURL = "http://localhost:8090/api";  

  constructor( private _httpClient : HttpClient ) { } 

  //--------------------------------------------------
  getAdiciones( codigo_activo: string ):Observable<Adicion[]> {
    const URL = this.baseURL + "/adiciones/"+codigo_activo;
    return this._httpClient.get<Adicion[]>(URL);
  }  // getAdiciones() 

} // export class AdicionService 
