import { Injectable } from "@angular/core";
import { Product } from "../model/Product";
import { CATALOG_MOCK } from "../model/mocks/PRODUCT_MOCK";
import { environment } from "../../environments/environment";

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

  public getVAT(): Promise<number> {
    return Promise.resolve(20);
  }

  public async run(): Promise<void> {
    const users = [
      { id: 1, name: "Vincent Chamayou" },
      { id: 2, name: "Pierre Bizeul" },
      { id: 3, name: "Vincent Mazyad" },
      { id: 4, name: "Gerant Cocagne" },
      { id: 5, name: "Samy Boumahdi" },
      { id: 6, name: "Florent Bonnet" },
      { id: 7, name: "Mourad Benzaid" },
    ];

    const salaries = [
      { id: 1, salary: 5000 },
      { id: 2, salary: 6000 },
      { id: 3, salary: 5500 },
      { id: 4, salary: 7000 },
      { id: 5, salary: 6500 },
      { id: 6, salary: 7500 },
      { id: 7, salary: 8000 },
    ];

    const usersPromise = Promise.resolve(users);
    const salariesPromise = Promise.resolve(salaries);


    const data1 = await usersPromise;
    const data2 = await salariesPromise;

    const mergedData = data1.map(user => {
      const salaryObj = data2.find(salary => salary.id === user.id);
      return {
        ...user,
        salary: salaryObj ? salaryObj.salary : null
      };
    });

    console.log("Merged Data:", mergedData);

  }
}
