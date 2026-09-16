import { Component, inject } from '@angular/core';
import { LoadingScreenService } from '../../services/loading-screen.service';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.css'
})
export class LoadingScreenComponent {
  private _service = inject(LoadingScreenService);
  public isLoading = this._service.isLoading;
}
