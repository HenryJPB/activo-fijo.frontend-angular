export class Ubicacion {
    codigo_ubic!: string; 
    descripcion!: string;
    
    constructor( codigo_ubic: string, descripcion: string ) {
        this.codigo_ubic = codigo_ubic; 
        this.descripcion = descripcion;  
    }
}