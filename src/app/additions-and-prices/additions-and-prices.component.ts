import {Component, OnInit, ViewChild} from '@angular/core';
import {IqSelect2Item} from './component-wrapper/src/app/iq-select2/iq-select2-item';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Addition, DataService} from './data.service';
import {IqSelect2Component} from './component-wrapper/src/app/iq-select2/iq-select2.component';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-additions-and-prices',
  templateUrl: './additions-and-prices.component.html',
  styleUrls: ['./additions-and-prices.component.css',
    '../app.component.css'],
  providers: [DataService]
})
export class AdditionsAndPricesComponent implements OnInit {

  public form: FormGroup;
  public listItems: (term: string) => Observable<Addition[]>;
  public listItemsMax: (term: string, ids: string[]) => Observable<Addition[]>;
  public getItems: (ids: string[]) => Observable<Addition[]>;
  public entityToIqSelect2Item: (entity: Addition) => IqSelect2Item;
  public count: number;
  @ViewChild('countrySingle') countrySingle: IqSelect2Component;

  constructor(private dataService: DataService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      countryMultipleMin0: [[{
        id: '1',
        name: 'Bussiness lunches',
        imagePath: 'src/assets/images/page6/bussines-lunch-icon.png'
      }]]
    });
    this.initializeCountryIqSelect2();
    this.form.valueChanges.subscribe(() => {
      // console.log('-->' + this.form.controls['countrySingle'].value);
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

  reset() {
    // console.log('Resetting form');
    this.form.reset();
  }

  private initializeCountryIqSelect2() {
    this.listItems = (term: string) => this.dataService.listData(term);
    this.listItemsMax = (term: string, ids: string[]) => {
      const selectedCount = ids ? ids.length : 0;
      return this.dataService
        .listDataMax(term, 3 + selectedCount)
        .pipe(
          tap(response => this.count = response.count),
          map((response) => response.results)
        );
    };
    this.getItems = (ids: string[]) => this.dataService.getItems(ids);
    this.entityToIqSelect2Item = (entity: any) => {
      return {
        id: entity.id,
        text: entity.name,
        imagePath: entity.imagePath,
        entity: entity
      };
    };
  }


}
