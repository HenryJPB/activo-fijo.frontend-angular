import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class LibHpService {

  constructor(  private sanitizer : DomSanitizer ) { }

  //-----------------------------------------------------------------------------------
  getBase64 = async( $event : any ) => new Promise( ( resolve, reject  ) => {
    try {
      const unsafeImage = window.URL.createObjectURL($event); 
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImage); 
      const reader = new FileReader();
      reader.readAsDataURL($event);  
      // **
      reader.onload = () => {
        resolve({
          blob: $event, 
          image, 
          base: reader.result 
        });
      } 
      // **
      reader.onerror = error => {
        resolve({
          blob: $event, 
          image, 
          base : null
        });
      }
      // ***
    } catch( e ) {
      return null;  
    } // try-cath
    return null;  
  } ); // getBase64() 

}
