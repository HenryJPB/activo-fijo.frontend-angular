import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activo } from 'src/modelos/Activo';
import { Ubicacion } from 'src/modelos/Ubicacion';
import { ListarUbicacionesComponent } from '../components/listar-ubicaciones/listar-ubicaciones.component';

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
  //private baseURL = "http://localhost:8090/api"; 
  private baseURL = "http://desica.gestion-act-fijos:8090/api"; 

  // private baseURLdelete = "http://localhost:8090/api/empleados/eliminar";

  // URL para gestion de Impresiones.
  // private baseURLimprimir = "http://localhost:8090/api/informes"; 

  // // Esta URL gets listado de todos los activos de la B.D.
  //private baseURL = "http://localhost:8090/api/activos"; 

  constructor( private _httpClient : HttpClient ) { }

  //-------------------------------------------------------------
  getActivos():Observable<Activo[]> {
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
  guardarActivo( activo: Activo ):Observable<Object> {
    const URL = this.baseURL + "/activos"; 
    //return this._httpClient.post(`${this.baseURL}`,activo ); 
    //return this._httpClient.post(URL,activo); 
    return this._httpClient.post(`${URL}`, activo ); 
  }

   //-------------------------------------------------------------
   guardar( activo: Activo, codigo_ubic : String ):Observable<Object> {
    const URL = this.baseURL + "/activos/"+codigo_ubic; 
    return this._httpClient.post( URL, activo ); 
  }

  //-------------------------------------------------------------
  guardarImagen():Observable<Object> {
    const URL = this.baseURL + "/activos"; 
    //return this._httpClient.post(`${this.baseURL}`,activo ); 
    //return this._httpClient.post(URL,activo); 
    return this._httpClient.post(`${URL}`,null); 
  }
  
  //este metodo sirve para obtener o buscar un registro x id
  getActivoPorId( id:number ):Observable<Activo>{
    const URL = this.baseURL + "/activos/buscarPorId/"+id;  
    return this._httpClient.get<Activo>(`${URL}`);
  }

  //este metodo sirve para obtener o buscar un registro x codigoActivo
  getActivoPorCodActivo( codigo_activo : string ):Observable<Activo>{
    const URL = this.baseURL + "/activos/buscarPorCodigo/"+codigo_activo;  
    return this._httpClient.get<Activo>(`${URL}`);
  }

  //------------------------------------------------------------------
  // https://www.youtube.com/watch?v=o_HV_FCs-Z0
  //------------------------------------------------------------------
  eliminar( id : number ):Observable<Object> { 
    const URL = this.baseURL + "/activos/"+id; 
    return this._httpClient.delete( URL ); 
  }

}  // class ActivoService 
