import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _isLoggedIn = signal<boolean>(false);
  public isLoggedIn = this._isLoggedIn.asReadonly();
  constructor() { }

  public login(username:string, password:string):boolean{
    if(username === "admin@admin.com" && password === "admin1234"){
      this._isLoggedIn.set(true);
    }
    else{
      this._isLoggedIn.set(false);
    }
    return this._isLoggedIn();
  }

  public logout():void{
    this._isLoggedIn.set(false);
  }

}
