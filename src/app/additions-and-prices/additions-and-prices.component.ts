import {Component, OnInit} from '@angular/core';
import {IqSelect2Item} from './component-wrapper/src/app/iq-select2-icon/iq-select2-item';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Addition, DataService} from './data.service';
import {map, tap} from 'rxjs/operators';
import {NavigationService} from '../navigation.service';
import {Router} from '@angular/router';

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
  public reservationListItemsMax: (term: string, ids: string[]) => Observable<Addition[]>;
  public reservationListItems: (term: string) => Observable<Addition[]>;
  public getReservationItems: (ids: string[]) => Observable<Addition[]>;
  public entityToIqSelect2Item: (entity: Addition) => IqSelect2Item;
  public count: number;

  public reservationDataList = [];

  constructor(private dataService: DataService,
              private formBuilder: FormBuilder,
              private navService: NavigationService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      additionalElements: [[]],
      additionalElementsReservation: [[]]
    });
    this.initializeAdditonIqSelect2();
    this.initializeAdditonReservationIqSelect2();
    this.form.valueChanges.subscribe(() => {
    });
  }

  send(formJson: string) {
  }

  onSelect(item: IqSelect2Item) {
    this.reservationDataList = this.form.get('additionalElements').value.slice();
  }

  onRemove(item: IqSelect2Item) {
    this.reservationDataList = this.form.get('additionalElements').value.slice();
  }

  reset() {
    this.form.reset();
  }

  onNext() {
    console.log(this.form);
    this.router.navigate(['step', ++this.navService.currentStep]);
  }

  onCancel() {
    this.form.reset();
  }

  onBack() {
    this.router.navigate(['step', --this.navService.currentStep]);
  }

  private initializeAdditonIqSelect2() {
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

  private initializeAdditonReservationIqSelect2() {
    this.reservationListItems = (term) => this.dataService.listReservationData(term);
    this.reservationListItemsMax = (term: string, ids: string[]) => {
      const selectedCount = ids ? ids.length : 0;
      return this.dataService
        .listReservationDataMax(term, 3 + selectedCount)
        .pipe(
          tap(response => this.count = response.count),
          map((response) => response.results)
        );
    };
    this.getReservationItems = (ids: string[]) => this.dataService.getReservationItems(ids);
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
