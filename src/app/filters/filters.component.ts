import {Component, OnInit} from '@angular/core';
import {IqSelect2Item} from './component-wrapper/src/app/iq-select2/iq-select2-item';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {DataService, Option} from './data.service';
import {NavigationService} from '../navigation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css',
    '../app.component.css'],
  providers: [DataService]
})
export class FiltersComponent implements OnInit {

  public form: FormGroup;
  public listItems: Array<(term: string) => Observable<Option[]>>;
  public getItems: (ids: string[]) => Observable<Option[]>;
  public entityToIqSelect2Item: (entity: Option) => IqSelect2Item;
  filterNames: string[];
  public count: number;

  constructor(private dataService: DataService,
              private navService: NavigationService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'filters': new FormArray([])
    });
    this.initializeCountryIqSelect2();
    this.filterNames = this.getFiltersName();
    this.generateFormControls();
    this.form.valueChanges.subscribe(() => {
    });
  }

  send(formJson: string) {
    // console.log(formJson);
  }

  onSelect(item: IqSelect2Item) {
    // console.log('Item selected: ' + item.text);
  }

  onRemove(item: IqSelect2Item) {
    // console.log('Item removed: ' + item.text);
  }

  onNext() {
    console.log(this.form);
    this.router.navigate(['step', ++this.navService.currentStep]);
  }

  onBack() {
    this.router.navigate(['step', --this.navService.currentStep]);
  }

  onCancel() {
    // console.log('Resetting form');
    this.form.reset();
  }

  getFiltersName() {
    const filterNames = [];
    for (const filter of this.dataService.filters) {
      filterNames.push(filter.name);
    }
    return filterNames;
  }

  generateFormControls() {
    for (const filterName of this.filterNames) {
      (<FormArray>this.form.get('filters')).push(new FormControl(null));
    }
  }

  private initializeCountryIqSelect2() {
    this.listItems = this.dataService.getListMethods();
    // this.listItems.push((term: string) => this.dataService.listData(term, index));
    this.entityToIqSelect2Item = (entity: any) => {
      return {
        id: entity.id,
        text: entity.name,
        entity: entity
      };
    };
  }


}



