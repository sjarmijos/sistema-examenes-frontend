import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginData = {
    "username":"",
    "password":""
  }

  constructor(
    private snack:MatSnackBar, 
    private loginService:LoginService,
    private router:Router
    ){}

  ngOnInit(): void {

  }



  formSubmit(){
    if(this.loginData.username.trim() == '' || this.loginData.username.trim() ==null){
      this.snack.open("El nombre de usuario es un campo obligatorio!!", 'Aceptar',{
        duration:3000
      })
      return;
    }
    if(this.loginData.password.trim() == '' || this.loginData.password.trim() ==null){
      this.snack.open("La contraseña es un campo obligatorio!!", 'Aceptar',{
        duration:3000
      })
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe({
      next: (data:any) =>{
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe({
          next:(user:any) => {
            this.loginService.setUser(user);
            console.log(user);

            if(this.loginService.getUserRole() == 'ADMIN'){
              //dashboard admin
              //window.location.href = '/admin';
              this.loginService.loginStatusSubject.next(true);
              this.router.navigate(['admin']);
            }else if(this.loginService.getUserRole() == 'NORMAL'){
              //user dashboard
              //window.location.href = '/user-dashboard';
              this.loginService.loginStatusSubject.next(true);
              this.router.navigate(['user-dashboard/0']);
            }else{
              this.loginService.logout();
            }
          }
        });
      },
      error: (error) => {
        console.log(error);
        this.snack.open("Detalles invalidos, vuelva a intentar!!","Aceptar",{
          duration:3000
        })
      },
      complete: () => console.log("login Service Complete")
    });

  }
}