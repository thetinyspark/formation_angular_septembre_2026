import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _isLoggedIn:boolean = false;
  constructor() { }

  public login(username:string, password:string):boolean{
    if(username === "admin" && password === "admin"){
      this._isLoggedIn = true;
    }
    else{
      this._isLoggedIn = false;
    }
    return this._isLoggedIn;
  }

  public logout():void{
    this._isLoggedIn = false;
  }

  public isLoggedIn():boolean{
    return this._isLoggedIn;
  }
}
