import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adicion } from 'src/modelos/Adicion';

@Injectable({
  providedIn: 'root'
})

export class AdicionService {

  //private baseURL = "http://localhost:8090/api";  
  private baseURL = "http://desica.gestion-act-fijos:8090/api";  

  constructor( private _httpClient : HttpClient ) { } 

  //----------------------------------------------------------------------
  getAdiciones( codigo_activo: string ):Observable<Adicion[]> {
    const URL = this.baseURL + "/adiciones/"+codigo_activo;
    return this._httpClient.get<Adicion[]>(URL);
  }  // getAdiciones() 

  //-----------------------------------------------------------------------
  getAdicionByCodigoActivoAndId( codigo_activo: string, id: number  ):Observable<Adicion> {
    const URL = this.baseURL + "/adiciones/buscar/"+codigo_activo+"/"+id;
    return this._httpClient.get<Adicion>(URL);
  }

  //-----------------------------------------------------------------------
  guardar( adicion : Adicion ):Observable<Object>  {
    const URL = this.baseURL + "/adiciones"; 
    // Ejemplo: return this._httpClient.post(`${URL}/${id}`, ubicacion );
    return this._httpClient.post(URL,adicion);
    //return this._httpClient.post(`${URL}`, adicion ); 
  }

  //-----------------------------------------------------------------------
  eliminar( codigo_activo: string , id:number ) {
    const URL = this.baseURL + "/adiciones/"+codigo_activo+"/"+id; 
    return this._httpClient.delete( URL );  
  } // eliminar().  

} // export class AdicionService 
