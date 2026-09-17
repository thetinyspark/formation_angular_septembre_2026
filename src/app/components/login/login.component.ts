import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private _builder:FormBuilder = inject(FormBuilder);
  private _userService:UserService = inject(UserService);
  public isLoggedIn = this._userService.isLoggedIn;
  public form = this._builder.group( 
    {
      email: ["admin@admin.com", [Validators.required, Validators.email]],
      password: ["admin1234", [Validators.required, this.validatePassword]],
    }
  );

  public validatePassword(control:AbstractControl){
    return (control.value.length >= 8) ? null : {tooShortPassword:true};
  }

  public login():void{
    if( this.form.valid){
      this._userService.login(
        this.form.get("email")?.value || "",
        this.form.get("password")?.value || "",
      );
    }
  }

  public logout():void{
    this._userService.logout();
  }
}
