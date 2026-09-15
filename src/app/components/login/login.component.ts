import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private _userService:UserService = inject(UserService);
  public login():void{
    this._userService.login("admin", "admin");
  }

  public logout():void{
    this._userService.logout();
  }
}
