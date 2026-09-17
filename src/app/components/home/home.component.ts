import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, NgZone } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  public num:number = 0;
  private _ref = inject(ChangeDetectorRef);
  private _ngZone = inject(NgZone);

  public ngOnInit(){

    this._ngZone.runOutsideAngular(
      ()=>{
          setInterval( 
            ()=>{
              if( this.num % 1000 == 0 ){

                this._ngZone.runTask( 
                  ()=>{
                    this._ref.markForCheck();
                  }
                )

              }
              this.num++;
            }, 
            1
          )
      }
    );

    
  }
}
