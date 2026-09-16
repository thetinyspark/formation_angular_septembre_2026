import { Injectable } from "@angular/core";
import { Product } from "../model/Product";
import { CATALOG_MOCK } from "../model/mocks/PRODUCT_MOCK";
import { environment } from "../../environments/environment";
import { firstValueFrom, map, Observable, of, Subject } from "rxjs";

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
    /*
    L'observable de type Subject permet d'avoir à disposition un observable (hot car non complété par défaut), 
    qui nous permet de diffuser de la data, depuis l'extérieur de l'observable. 
    En gros, il s'agit d'un canal de diffusion qui respecte le pattern Observer. 
    */
    const users$ = new Subject<any[]>();
    const salaries$ = new Subject<any[]>();
    const usersWithSalaries$ = new Subject<any[]>();

    var currentUsers:any[] = [];
    var currentSalaries:any[] = [];

    

    users$.subscribe((users: any[]) => {
      currentUsers = users;
      usersWithSalaries$.next( this.mergeUsersWithSalaries(currentUsers, currentSalaries ))
    });

    salaries$.subscribe((salaries: any[]) => {
      currentSalaries = salaries;
      usersWithSalaries$.next( this.mergeUsersWithSalaries(currentUsers, currentSalaries ))
    });

    
    this.getUsers().subscribe((users: any[]) => users$.next(users));
    usersWithSalaries$.subscribe(console.log);
    this.getSalaries().subscribe((salaries: any[]) => salaries$.next(salaries));
  }
}
