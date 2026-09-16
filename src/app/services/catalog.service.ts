import { Injectable } from "@angular/core";
import { Product } from "../model/Product";
import { CATALOG_MOCK } from "../model/mocks/PRODUCT_MOCK";
import { environment } from "../../environments/environment";
import {
  combineLatest,
  firstValueFrom,
  forkJoin,
  map,
  Observable,
  of,
  ReplaySubject,
  Subject,
} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CatalogService {
  constructor() {}

  public async getCatalog(): Promise<Product[]> {
    // on utilise cette version si on veut les données bouchonnées
    // return Promise.resolve(CATALOG_MOCK);

    // une promise est juste un objet standard qui permet de gérer l'obtention
    // d'une donnée de façon asynchrone. Elle peut être résolue avec succès, ou
    // rejetée avec une erreur.

    // dans le cas présent nous allons résoudre un tableau de produits
    // en utilisant l'API standard de Javascript à l'aide de window.fetch();
    try {
      // si dans une fonction asynchrone on utilise le mot clé await, alors
      // l'éxécution de la fonction est suspendue jusqu'à ce que la promesse soit résolue.
      const response = await window.fetch(environment.catalogURI);
      const catalog = await response.json();
      return catalog as Product[];
    } catch (error) {
      console.error("Error fetching catalog: ", error);
      return Promise.resolve([]); // retourne un tableau vide en cas d'erreur
    }
  }

  public getUsers(): Observable<any[]> {
    const users = [
      { id: 1, name: "Vincent Chamayou" },
      { id: 2, name: "Pierre Bizeul" },
      { id: 3, name: "Vincent Mazyad" },
      { id: 4, name: "Gerant Cocagne" },
      { id: 5, name: "Samy Boumahdi" },
      { id: 6, name: "Florent Bonnet" },
      { id: 7, name: "Mourad Benzaid" },
    ];

    return of(users);
  }

  public getSalaries(): Observable<any[]> {
    const salaries = [
      { id: 1, salary: 5000 },
      { id: 2, salary: 6000 },
      { id: 3, salary: 5500 },
      { id: 4, salary: 7000 },
      { id: 5, salary: 6500 },
      { id: 6, salary: 7500 },
      { id: 7, salary: 8000 },
    ];

    return of(salaries);
  }

  public getUsersAndSalaries(): Observable<any[]> {
    /*
    L'observable de type ReplaySubject permet d'avoir à disposition un observable (hot car non complété par défaut), 
    qui nous permet de diffuser de la data, depuis l'extérieur de l'observable. 
    En gros, il s'agit d'un canal de diffusion qui respecte le pattern Observer. 

    Il garde en plus, un historique des données précédemment diffusées. 
    Lorsqu'on on y souscrit, il rediffuse les données en question.
    On peut paramétrer la longueur de l'historique à la création du replaysubject
    */

    const usersWithSalaries$ = new ReplaySubject<any[]>();
    type usersAndSalariesData = { users: any[]; salaries: any[] };

    // forkJoin attend que les flux soient complétés quoique ce soit
    // combineLatest attend que tous les flux aient publié au moins une donnée
    // mais il s'en fiche si les flux ne sont pas complétés.
    forkJoin({
      users: this.getUsers(),
      salaries: this.getSalaries(),
    })
      .pipe(
        map((data: usersAndSalariesData) => {
          return this.mergeUsersWithSalaries(data.users, data.salaries);
        }),
      )
      .subscribe((data: any[]) => {
        usersWithSalaries$.next(data);
      });

    return usersWithSalaries$;
  }

  private mergeUsersWithSalaries(users: any[], salaries: any[]): any[] {
    return users.map((user) => {
      const salaryObj = salaries.find((salary) => salary.id === user.id);
      return {
        ...user,
        salary: salaryObj ? salaryObj.salary : null,
      };
    });
  }

  public async run(): Promise<void> {
    const obs1 = new Observable( 
      (sub)=>{
        let myInterval = setInterval( 
          ()=>{
            console.log("---");
            sub.next( Math.round( Math.random() * 100 ));
          }, 
          1000
        );

        // cette fonction sera éxécutée au moment où on se désinscrit de l'observable
        // cette fonction de désinscription sert à compléter le flux et à nettoyer
        // les éventuelles connexions à des flux extérieurs ou tout autre processus
        // de diffusion de données au cours du temps ou tout autre mécanisme qui 
        // pourrait éventuellement empêcher le recyclage de l'observable par le garbage collector
        return ()=>{
          console.log("on unsub");
          sub.complete();
          clearInterval(myInterval);
        };
      }
    ); 

    const subscription = obs1.subscribe(console.log);

    setTimeout( 
      ()=>{
        subscription.unsubscribe();
      }, 
      5000
    );
  }
}
