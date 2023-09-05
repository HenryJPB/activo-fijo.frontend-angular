import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activo } from 'src/modelos/Activo';

@Injectable({
  providedIn: 'root'
})

/* 
    check: https://www.youtube.com/watch?v=o_HV_FCs-Z0
    Video Desarrollo de una aplicación web Full Stack con Spring Boot y Angular 
    La tecnologia avanza
*/ 
export class ActivoService {

  // Esta URL gets listado de todos los activos de la B.D.
  private baseURL = "http://localhost:8090/api"; 

  // private baseURLdelete = "http://localhost:8090/api/empleados/eliminar";

  // URL para gestion de Impresiones.
  // private baseURLimprimir = "http://localhost:8090/api/informes"; 

  // // Esta URL gets listado de todos los activos de la B.D.
  //private baseURL = "http://localhost:8090/api/activos"; 

  constructor( private _httpClient : HttpClient ) { }

  //-------------------------------------------------------------
  getAcfivos():Observable<Activo[]> {
    const URL = this.baseURL + "/activos";  
    return this._httpClient.get<Activo[]>(URL);
   }  // getAcfivos()

  //-------------------------------------------------------------
  getActivosLike( filtro:string ):Observable<Activo[]> {
    //var URL = this.baseURL + "/activos/like/claveVEN";  // prueba!! 👍 ✔️  
    const URL = this.baseURL + "/activos/like/"+filtro;  
    return this._httpClient.get<Activo[]>(URL);
  } // getAcfivosLike()

  /* Ejemplo: 
  * guardarTrabajador(trabajador: Trabajador ):Observable<Object> {
  *   return this.httpClient.post(`${this.baseURL}`,trabajador); 
  * }
  * */    
  //-------------------------------------------------------------
  guardarImagenI( activo: Activo ):Observable<Object> {
    const URL = this.baseURL + "/activos"; 
    //return this._httpClient.post(`${this.baseURL}`,activo ); 
    //return this._httpClient.post(URL,activo); 
    return this._httpClient.post(`${URL}`, activo ); 
  }

  //-------------------------------------------------------------
  guardarImagen():Observable<Object> {
    const URL = this.baseURL + "/activos"; 
    //return this._httpClient.post(`${this.baseURL}`,activo ); 
    //return this._httpClient.post(URL,activo); 
    return this._httpClient.post(`${URL}`,null); 
  }
  
  //este metodo sirve para obtener o buscar un registro
  getActivoPorId( id:number ):Observable<Activo>{
    const URL = this.baseURL + "/activos/buscar/"+id; 
    //console.log("URL="+URL);  
    return this._httpClient.get<Activo>(`${URL}`);
  }

}  // class ActivoService 
