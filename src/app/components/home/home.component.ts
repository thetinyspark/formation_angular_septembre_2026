import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, NgZone } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  public num = 0;
  private _ref = inject(ChangeDetectorRef);
  private _ngZone = inject(NgZone);

  public ngOnInit(){


    // this._ngZone.runOutsideAngular(
    //   ()=>{
    //       setInterval( 
    //         ()=>{
    //           if( this.num % 1000 == 0 ){

    //             this._ngZone.runTask( 
    //               ()=>{
    //                 this._ref.markForCheck();
    //               }
    //             )

    //           }
    //           this.num++;
    //         }, 
    //         1
    //       )
    //   }
    // );

    // // ngzone repose sur le pattern immuatability
    // class MyComponent {
    //     private _state:any = {};
    //     private _oldState:any = {};

    //     public getState(){
    //       return this._state;
    //     }

    //     public setState( state:any ){
    //       this._state = {...this._state, ...state};
    //       Object.freeze(this._state);
    //     }

    //     public detectChanges():boolean{
    //       const result = (this._state === this._oldState) ? false : true;
    //       this._oldState = this._state;
    //       return result;
    //     }
    // }

    // console.log(this);
    // const component = new MyComponent(); 
    // component.setState({name:"Merlin"}); 
    // component.setState({age: 1000}); 
    // component.setState({info: {job:"Echanteur"}}); 
    // component.setState({info: {
    //   job:{
    //     title: "Enchanteur", 
    //     trueJob: "Druide"
    //   }
    // }}); 
    // console.log(component.detectChanges(), component.getState());
    // si la valeur contenue dans name change, alors le rendu doit 
    // être actualisé, mais comment le détecter ? 
    // on pourrait systématiquement comparer à chaque frame, les vieilles 
    // valeurs avec les valeurs en cours, cela demanderait de stocker en 
    // permanence un historique des valeurs de la frame précédente et 
    // ce serait possible si cela se limitait à cela. 

    // Le vrai problème c'est lorsqu'on a des valeurs, qui sont des objets
    // complexes, pouvant abriter théoriquement un niveau de profondeur infini.

    


  }
}
