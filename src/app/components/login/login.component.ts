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
      password: ["admin1234", [Validators.required]],
    }
  );

  public validatePassword(control:AbstractControl){
    // ici implémentez un bout de code qui vérifie
    // si le password contient au minimum 8 caractères

    // si jamais c'est valide, alors renvoyez null
    // sinon, renvoyez un object avec des paires clés valeurs
    // les clés étant les noms des erreurs, les valeurs, leur description
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
