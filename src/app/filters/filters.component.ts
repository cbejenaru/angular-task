import { Component, OnInit } from '@angular/core';
import { IqSelect2Item } from './component-wrapper/src/app/iq-select2/iq-select2-item';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DataService, Option } from './data.service';
import { NavigationService } from '../navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css', '../app.component.css'],
  providers: [DataService],
})
export class FiltersComponent implements OnInit {
  public form: FormGroup;
  public listItems: Array<(term: string) => Observable<Option[]>>;
  public getItems: (ids: string[]) => Observable<Option[]>;
  public entityToIqSelect2Item: (entity: Option) => IqSelect2Item;
  filterNames: string[];
  public count: number;

  constructor(
    private dataService: DataService,
    private navService: NavigationService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      filters: new FormArray([]),
    });
    this.initializeIqSelect2();
    this.filterNames = this.getFiltersName();
    if (localStorage.getItem('step5') !== null) {
      const stored = JSON.parse(localStorage.getItem('step5'));
      this.filterNames = [];
      stored.forEach(element => {
        (<FormArray>this.form.get('filters')).controls.push(
          new FormControl(element.selectedOptions),
        );
        this.filterNames.push(element.filterName);
      });
    } else {
      this.generateFormControls();
    }
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
    const filters = [];
    let i = 0;
    this.filterNames.forEach(element => {
      filters.push({
        filterName: element,
        selectedOptions: (<FormArray>this.form.get('filters')).get(i.toString())
          .value,
      });
      i += 1;
    });
    localStorage.setItem('step5', JSON.stringify(filters));
    this.navService.currentStep += 1;
    this.router.navigate(['step', this.navService.currentStep]);
  }

  onBack() {
    this.navService.currentStep -= 1;
    this.router.navigate(['step', this.navService.currentStep]);
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

  private initializeIqSelect2() {
    this.listItems = this.dataService.getListMethods();
    // this.listItems.push((term: string) => this.dataService.listData(term, index));
    this.entityToIqSelect2Item = (entity: any) => {
      return {
        entity,
        id: entity.id,
        text: entity.name,
      };
    };
  }
}
