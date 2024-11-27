import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginModel } from 'src/app/core/models/login.model';
import { CustomvalidationService } from 'src/app/servicios/customvalidation.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

  form: FormGroup; 
  
  //password input
  @ViewChild('passwordInput') passwordInput:ElementRef|any;
  eyeClass:string = 'bi-eye-fill';
  isShowing:boolean = false;
  showValidationErrors:boolean = false;
  loginModel:LoginModel = {} as LoginModel;
  msg:string="";

  destroyloginMsg?: Subscription;

  constructor(private fb:FormBuilder,readonly loginService:LoginService,private customValidator:CustomvalidationService) { 

      this.form = this.fb.group({
        email: ['',[Validators.required,Validators.pattern(this.customValidator.emailValidation())]],
        password: ['',Validators.required]
      });

  } //  constructor 
  
  ngOnDestroy(): void {
    if (this.destroyloginMsg) {
      this.destroyloginMsg.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.isLoggedIn();
    this.destroyloginMsg = this.loginService.currentLoginMsg.subscribe((responseItem: { msg: string; }) =>{
      
        this.msg=responseItem.msg;
    
    });
  }

  //----------------------------------------------------------------------------------------
  login(){
    const val = this.form.value;

    if(this.form.valid){

      this.loginModel.user = {'email':val.email, 'password':val.password};
      this.loginService.login(this.loginModel);
      
      this.showValidationErrors = false;
    }else{
      this.showValidationErrors = true;
    }
  }

  //-----------------------------------------------------------------------------------------
  isLoggedIn(){
    this.loginService.isLoggedIn()
  }

  //-----------------------------------------------------------------------------------------
  showPass(){

    if(this.isShowing){
      this.passwordInput.nativeElement.type='password';
      this.eyeClass='bi-eye-fill';
      this.isShowing=false;
    }else{
      this.passwordInput.nativeElement.type='text';
      this.eyeClass='bi-eye-slash-fill';
      this.isShowing=true;
    }
    
  }

  //----------------------------------------------------------------------------------------------------
  getErrorMessage(field:string) {
    
    if ((field=='email')&&(this.form.get('email')?.hasError('required')||this.form.get('email')?.hasError('pattern'))) 
      return 'Debe ingresar un email válido';
    
    if (field=='password'&&(this.form.get('password')?.hasError('required')))
        return 'Debe ingresar una contraseña';

    return '';
  }


}
