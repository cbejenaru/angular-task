import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
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

  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private options: RequestOptions = new RequestOptions({headers: this.headers});
  private list: Addition[] = [{
    id: '1',
    name: 'Bussiness lunchies',
    imagePath: 'assets/images/page6/bussines-lunch-icon.png',
  }];

  constructor(private http: Http) {
  }

  public listData(pattern: string, maxResults?: number): Observable<Addition[]> {
    return of(this.list
      .filter((country) => country.name.toUpperCase().indexOf(pattern.toUpperCase()) !== -1)
      .sort(this.sortFunction));
  }

  public listDataMax(pattern: string, maxResults: number): Observable<{ count: number, results: Addition[] }> {
    const filteredList = this.list
      .filter((country) => country.name.toUpperCase().indexOf(pattern.toUpperCase()) !== -1)
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

  private sortFunction(country1: Addition, country2: Addition) {
    if (country1.name < country2.name) {
      return -1;
    }
    if (country1.name > country2.name) {
      return 1;
    }
    return 0;
  }

}
