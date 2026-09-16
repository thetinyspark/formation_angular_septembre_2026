import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {
  public isLoading = signal<boolean>(false);
  constructor() { }
}
