import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { Ubicacion } from 'src/modelos/Ubicacion';

@Injectable({
  providedIn: 'root'
})

export class UbicacionService {

  private ip_backend = environment.ip_backend;  
  // Esta URL gets listado de ubicaciones de la B.D.
  // private baseURL = "http://localhost:8090/api"; 
  private baseURL = "http://"+this.ip_backend+":8090/api";  

  // URL para gestion de Impresiones.
  // private baseURLimprimir = "http://localhost:8090/api/informes"; 

  constructor( private _httpClient : HttpClient ) { }

  // Modelo I
  // checa: https://www.youtube.com/watch?v=o_HV_FCs-Z0 -- desarrollo de una full api rest con Angular+MariDB+Spring Boot.  
  getUbicacionesI():Observable<Ubicacion[]> {
    return this._httpClient.get<Ubicacion[]>(`${this.baseURL}`);  
  } // getUbicacionesI()
  
  // Modelo II
  // checa: https://www.youtube.com/watch?v=Yizqg441BOo&t=5s 
  getUbicaciones():Observable<Ubicacion[]> {
    var URL = this.baseURL+"/ubicaciones";  
    return this._httpClient.get<Ubicacion[]>(URL);  
  } // getUbicaciones()
  
  //------------------------------------------------------------------------
  getUbicacionesLike( filtro : string ):Observable<Ubicacion[]> {
    var URL = this.baseURL+"/ubicaciones/like/"+filtro;
    return this._httpClient.get<Ubicacion[]>(URL); 
  } 

  //------------------------------------------------------------------------
  guardar( ubicacion : Ubicacion ):Observable<Object> {
    const URL = this.baseURL + "/ubicaciones" 
    //return this._httpClient.post(`${this.baseURL}`,activo ); 
    //return this._httpClient.post(URL,activo); 
    return this._httpClient.post(`${URL}`, ubicacion );
    //return this._httpClient.post(`${URL}/${id}`, ubicacion );
  }

  //-----------------------------------------------------------------------
  eliminar( codigo_ubic: string ) {
    const URL = this.baseURL + "/ubicaciones/"+codigo_ubic; 
    return this._httpClient.delete( URL );  
  } // eliminar().  

  //----------------------------------------------------------------------
  getUbicacionCod( codigo_ubic : string ):Observable<Ubicacion> {
    const URL = this.baseURL + "/ubicaciones/buscar/"+codigo_ubic; 
    return this._httpClient.get<Ubicacion>(URL);  
  }

}
