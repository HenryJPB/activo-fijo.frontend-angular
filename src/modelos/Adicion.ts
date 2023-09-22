export class Adicion {
    id: number; 
    codigo_activo: string;   
    fecha: Date; 
    descripcion: string; 
    vida_util: number; 
    valor_adicion: number;  

    constructor( id:number, codigo_activo: string, fecha: Date, descripcion: string, vida_util: number, valor_adicion: number ) {
        this.id = id; 
        this.codigo_activo = codigo_activo;
        this.fecha = fecha;
        this.descripcion = descripcion; 
        this.vida_util = vida_util;
        this.valor_adicion = valor_adicion;
    } 
}