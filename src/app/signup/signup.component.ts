import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent  implements OnInit {
  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  loginForm!:FormGroup;
 constructor(private fb :FormBuilder,private auth:AuthService,private router:Router){}
 ngOnInit():void{
  this.loginForm =this.fb.group({
    username:['',Validators.required],
    //password:['',Validators.required],
    email:['',Validators.required],
    firstname:['',Validators.required],
  //  lastname:['',Validators.required]
  })
 }
 hideshowpass(){
this.isText =!this.isText;
this.isText ? this.eyeIcon = "fa-eye":this.eyeIcon ="fa-eye-slash";
this.isText?this.type="text":this.type="password";
 }
 onsubmit(){
  if(this.loginForm.valid){
    console.log(this.loginForm.value)
    this.auth.signUp(this.loginForm.value)
    .subscribe({
      next:(res=>{
        alert(res.message)
      }),
      error:(err=>{
        alert(err.message)
        this.router.navigate(['welcome'])
      })
    })
    alert("Successfully Register")
  }
  else{
//  this.validateAllFormFileds(this.loginForm)
    alert("Your Form is invalid ")
  }
 }
//  private validateAllFormFileds(formGroup:FormGroup){
//   Object.keys(formGroup.controls).forEach(field=>{
//     const control = formGroup.get(field);
//   if(control instanceof FormControl){
//     control.markAsDirty({onlySelf:true});
//   }else if(control instanceof FormGroup){
//     this.validateAllFormFileds(control)
//   }
// })
//  }
}
