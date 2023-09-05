import { Ubicacion } from "./Ubicacion";

export class Activo {
    id!: number;  
    codigo_activo! : string;  
    descripcion! : string;
    ubicacion! : Ubicacion;  
    //imagen! : Blob;   
    imagen! : any [];  
    nro_compra! : string; 
    marca! : string;  
    modelo! : string; 
    serial! : string;  
    vida_util! : number;
    valor_inicial! : number; 
    valor_rescate! : number;
    valor_libro! : number;  
    depre_anual! : number; 
    depre_acum! : number;   
    observacion! : string;  
    desincorporado! : number;   

    constructor(  id: number, codigo_activo : string, descripcion : string, ubicacion : Ubicacion, 
                   imagen : any [], nro_compra : string, marca : string, modelo : string,
                    serial : string, vida_util : number, valor_inicial : number, valor_rescate : number, 
                     valor_libro : number, depre_anual : number, depre_acum : number, observacion : string,   
                      desincorporado : number )  
    {
        this.id = id;  
        this.codigo_activo = codigo_activo; 
        this.descripcion = descripcion; 
        this.ubicacion = ubicacion; 
        this.imagen = imagen; 
        this.nro_compra = nro_compra; 
        this.marca = marca; 
        this.modelo = modelo; 
        this.serial = serial; 
        this.vida_util = vida_util; 
        this.valor_inicial = valor_inicial; 
        this.valor_rescate = valor_rescate;  
        this.valor_libro = valor_libro; 
        this.depre_anual = depre_anual; 
        this.depre_acum = depre_acum;
        this.observacion = observacion; 
        this.desincorporado = desincorporado;   
    }

}