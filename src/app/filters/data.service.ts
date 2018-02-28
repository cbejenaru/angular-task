import {Injectable, OnInit} from '@angular/core';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

export class Option {
  id: string;
  name: string;
}

export class Filter {
  name: string;
  options: Option[];
}

@Injectable()
export class DataService implements OnInit {

  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private options: RequestOptions = new RequestOptions({headers: this.headers});

  filters: Filter[] = new Array();
    // [
  //   {
  //     name: 'First filter',
  //     options: [
  //       {
  //         id: '1',
  //         name: 'Op1'
  //       },
  //       {
  //         id: '2',
  //         name: 'Op2'
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Second filter',
  //     options: [
  //       {
  //         id: '1',
  //         name: 'Option1'
  //       },
  //       {
  //         id: '2',
  //         name: 'Option2'
  //       },
  //       {
  //         id: '3',
  //         name: 'Option3'
  //       }
  //     ]
  //   }];


  constructor() {
  }

  ngOnInit() {
    // this.filters = this.generateFilters(5);
  }

  getListMethods() {
    this.filters = this.generateFilters(5);
    let methods: Array<(term: string) => Observable<Option[]>>;
    methods = new Array();
    let i = 0;
    for (const filter of this.filters) {
      const opt: Option[] = (<Filter>this.filters[i]).options;
      methods.push(
        (pattern: string, maxResults?: number) => {
          return of(opt
            .filter((option) => option.name.toUpperCase().indexOf(pattern.toUpperCase()) !== -1)
            .sort(this.sortFunction));
        });
      i++;
    }
    return methods;
  }

  // public listData(pattern: string, maxResults?: number): Observable<Option[]> {
  //   return of(this.filters.options
  //     .filter((country) => country.name.toUpperCase().indexOf(pattern.toUpperCase()) !== -1)
  //     .sort(this.sortFunction));
  // }

  private sortFunction(option1: Option, option2: Option) {
    if (option1.name < option2.name) {
      return -1;
    }
    if (option1.name > option2.name) {
      return 1;
    }
    return 0;
  }

  generateFilters(filtersNumber: number) {
    const filters: Filter[] = new Array();
    for (let i = 0; i < filtersNumber; i++) {
      filters.push({
        name: this.generateText(10),
        options: this.generateOptions()
      });
    }
    console.log(filters);
    return filters;
  }

  generateText(n) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < n; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  generateOptions() {
    const n = Math.floor(2 + Math.random() * 12);
    const options: Option[] = new Array();
    console.log('Options:' + n);
    for (let i = 0; i < n; i++) {
      options.push({
        id: i.toString(),
        name: this.generateText(12)
      });
    }
    return options;
  }

}
