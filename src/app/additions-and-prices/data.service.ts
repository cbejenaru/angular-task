import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {timer} from 'rxjs/observable/timer';

export class Addition {
  id: string;
  name: string;
  imagePath: string;
}

@Injectable()
export class DataService {

  public list: Addition[] = [{
    id: '1',
    name: 'Bussiness lunchies',
    imagePath: './assets/images/page6/bussines-lunch-icon.png',
  },
    {
      id: '2',
      name: 'Terasa',
      imagePath: './assets/images/page6/terasa-icon.png',
    },
    {
      id: '3',
      name: 'Livrare promptă',
      imagePath: './assets/images/page6/delivery-icon.png',
    },
    {
      id: '4',
      name: 'Parcare subterana',
      imagePath: './assets/images/page6/parking-icon.png',
    },
    {
      id: '5',
      name: 'Sărbători cu un meniu separat',
      imagePath: './assets/images/page6/cake-icon.png',
    },
    {
      id: '6',
      name: 'Chinese crockery',
      imagePath: './assets/images/page6/chinese-icon.png',
    }];

  public reservationList: Addition[] = [{
    id: '1',
    name: 'Bussiness lunchies',
    imagePath: './assets/images/page6/bussines-lunch-icon.png',
  },
    {
      id: '2',
      name: 'Terasa',
      imagePath: './assets/images/page6/terasa-icon.png',
    },
    {
      id: '3',
      name: 'Livrare promptă',
      imagePath: './assets/images/page6/delivery-icon.png',
    }];

  constructor() {
  }

  public listData(pattern: string, maxResults?: number): Observable<Addition[]> {
    return of(this.list
      .filter((addition) => addition.name.toUpperCase().indexOf(pattern.toUpperCase()) !== -1)
      .sort(this.sortFunction));
  }

  public listDataMax(pattern: string, maxResults: number): Observable<{ count: number, results: Addition[] }> {
    const filteredList = this.list
      .filter((addition) => addition.name.toUpperCase().indexOf(pattern.toUpperCase()) !== -1)
      .sort(this.sortFunction);

    return timer(1000)
      .pipe(map((t) => {
        return {
          count: filteredList.length,
          results: maxResults && maxResults < filteredList.length ? filteredList.splice(0, maxResults) : filteredList
        };
      }));
  }

  public getItems(ids: string[]): Observable<Addition[]> {
    const selectedItems: Addition[] = [];

    ids.forEach((id) => {
      this.list
        .filter((item) => item.id === id)
        .map((item) => selectedItems.push(item));
    });

    return of(selectedItems);
  }

  public listReservationData(pattern: string, maxResults?: number): Observable<Addition[]> {
    return of(this.reservationList
      .filter((addition) => addition.name.toUpperCase().indexOf(pattern.toUpperCase()) !== -1)
      .sort(this.sortFunction));
  }

  public listReservationDataMax(pattern: string, maxResults: number): Observable<{ count: number, results: Addition[] }> {
    const filteredList = this.reservationList
      .filter((addition) => addition.name.toUpperCase().indexOf(pattern.toUpperCase()) !== -1)
      .sort(this.sortFunction);

    return timer(1000)
      .pipe(map((t) => {
        return {
          count: filteredList.length,
          results: maxResults && maxResults < filteredList.length ? filteredList.splice(0, maxResults) : filteredList
        };
      }));
  }

  public getReservationItems(ids: string[]): Observable<Addition[]> {
    const selectedItems: Addition[] = [];

    ids.forEach((id) => {
      this.reservationList
        .filter((item) => item.id === id)
        .map((item) => selectedItems.push(item));
    });

    return of(selectedItems);
  }

  public sortFunction(addition1: Addition, addition2: Addition) {
    if (addition1.name < addition2.name) {
      return -1;
    }
    if (addition1.name > addition2.name) {
      return 1;
    }
    return 0;
  }

}
