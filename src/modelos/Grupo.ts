export class Grupo {

    id! : number;
    descripcion! : string; 
    cuenta_cargo! : string; 
    cuenta_abono! : string; 
    tipo_activo! : string; 
    
    constructor( id: number, descripcion : string, cuenta_abono : string,
                    cuenta_cargo : string, tipo_activo : string ) {
        this.id = id;
        this.descripcion = descripcion; 
        this.cuenta_abono = cuenta_abono; 
        this.cuenta_cargo = cuenta_cargo; 
        this.tipo_activo = tipo_activo;   
    }

} // export class