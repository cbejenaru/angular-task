import {AfterViewInit, Component, EventEmitter, forwardRef, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {IqSelect2Item} from './iq-select2-item';
import {IqSelect2IconResultsComponent} from '../iq-select2-icon-results/iq-select2-results.component';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Messages} from './messages';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {debounceTime, distinctUntilChanged, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

const KEY_CODE_DOWN_ARROW = 40;
const KEY_CODE_UP_ARROW = 38;
const KEY_CODE_ENTER = 13;
const KEY_CODE_TAB = 9;
const KEY_CODE_DELETE = 8;
const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IqSelect2IconComponent),
  multi: true
};
const noop = () => {
};

@Component({
  selector: 'iq-select2-icon',
  templateUrl: './iq-select2.component.html',
  styleUrls: ['./iq-select2.component.css'],
  providers: [VALUE_ACCESSOR]
})
export class IqSelect2IconComponent implements AfterViewInit, ControlValueAccessor {

  MORE_RESULTS_MSG = 'Showing ' + Messages.PARTIAL_COUNT_VAR + ' of ' + Messages.TOTAL_COUNT_VAR + ' results. Refine your search to show more results.';
  NO_RESULTS_MSG = 'No results available';
  @Input() messages: Messages = {
    moreResultsAvailableMsg: this.MORE_RESULTS_MSG,
    noResultsAvailableMsg: this.NO_RESULTS_MSG
  };
  @Input() dataSourceProvider: (term: string, selected?: any[]) => Observable<any[]>;
  @Input() dataList;
  @Input() selectedProvider: (ids: string[]) => Observable<any[]>;
  @Input() iqSelect2ItemAdapter: (entity: any) => IqSelect2Item;
  @Input() referenceMode: 'id' | 'entity' = 'id';
  @Input() multiple = false;
  @Input() searchDelay = 250;
  @Input() css: string;
  @Input() placeholder = '';
  @Input() minimumInputLength = 2;
  @Input() disabled = false;
  @Input() searchIcon = 'caret';
  @Input() deleteIcon = 'glyphicon glyphicon-remove';
  @Input() resultsCount;
  @Input() clientMode = false;
  @Output() onSelect: EventEmitter<IqSelect2Item> = new EventEmitter<IqSelect2Item>();
  @Output() onRemove: EventEmitter<IqSelect2Item> = new EventEmitter<IqSelect2Item>();
  @ViewChild('results') results: IqSelect2IconResultsComponent;
  templateRef: TemplateRef<any>;
  term = new FormControl();
  resultsVisible = false;
  listData: IqSelect2Item[];
  fullDataList: IqSelect2Item[];
  selectedItems: IqSelect2Item[] = [];
  searchFocused = false;
  onTouchedCallback: () => void = noop;
  onChangeCallback: (_: any) => void = noop;
  @ViewChild('termInput') private termInput;
  private placeholderSelected = '';

  constructor() {
  }

  ngAfterViewInit() {
    this.subscribeToChangesAndLoadDataFromObservable();
  }

  writeValue(selectedValues: any): void {
    if (selectedValues) {
      if (this.referenceMode === 'id') {
        this.populateItemsFromIds(selectedValues);
      } else {
        this.populateItemsFromEntities(selectedValues);
      }
    } else {
      this.placeholderSelected = '';
      this.selectedItems = [];
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onItemSelected(item: IqSelect2Item) {
    if (this.multiple) {
      this.selectedItems.push(item);
      const index = this.listData.indexOf(item, 0);
      if (index > -1) {
        this.listData.splice(index, 1);
      }
    } else {
      this.selectedItems.length = 0;
      this.selectedItems.push(item);
    }

    this.onChangeCallback(this.buildValue());
    this.term.patchValue('', {emitEvent: false});
    setTimeout(() => this.focusInput(), 1);
    this.resultsVisible = false;
    this.onSelect.emit(item);
    if (!this.multiple) {
      this.placeholderSelected = item.text;
    }
  }

  removeItem(item: IqSelect2Item) {
    const index = this.selectedItems.indexOf(item, 0);

    if (index > -1) {
      this.selectedItems.splice(index, 1);
    }

    this.onChangeCallback(this.buildValue());
    this.onRemove.emit(item);
    if (!this.multiple) {
      this.placeholderSelected = '';
    }
  }

  onFocus() {
    this.searchFocused = true;
  }

  onBlur() {
    this.term.patchValue('', {emitEvent: false});
    this.searchFocused = false;
    this.resultsVisible = false;
    this.onTouchedCallback();
  }

  getInputWidth(): string {
    const searchEmpty = this.selectedItems.length === 0 && (this.term.value === null || this.term.value.length === 0);
    const length = this.term.value === null ? 0 : this.term.value.length;
    if (!this.multiple) {
      return '100%';
    } else {
      return searchEmpty ? '100%' : (1 + length * .6) + 'em';
    }
  }

  onKeyUp(ev) {
    if (this.results) {
      if (ev.keyCode === KEY_CODE_DOWN_ARROW) {
        this.results.activeNext();
      } else if (ev.keyCode === KEY_CODE_UP_ARROW) {
        this.results.activePrevious();
      } else if (ev.keyCode === KEY_CODE_ENTER) {
        this.results.selectCurrentItem();
      }
    } else {
      if (this.minimumInputLength === 0) {
        if (ev.keyCode === KEY_CODE_ENTER || ev.keyCode === KEY_CODE_DOWN_ARROW) {
          this.focusInputAndShowResults();
        }
      }
    }
  }

  onKeyDown(ev) {
    if (this.results) {
      if (ev.keyCode === KEY_CODE_TAB) {
        this.results.selectCurrentItem();
      }
    }

    if (ev.keyCode === KEY_CODE_DELETE) {
      if ((!this.term.value || this.term.value.length === 0) && this.selectedItems.length > 0) {
        this.removeItem(this.selectedItems[this.selectedItems.length - 1]);
      }
    }
  }

  focusInput() {
    if (!this.disabled) {
      this.termInput.nativeElement.focus();
      this.resultsVisible = false;
    }
    this.searchFocused = !this.disabled;
  }

  focusInputAndShowResults() {
    if (!this.disabled) {
      this.termInput.nativeElement.focus();
      this.subscribeToResults(of(''));
    }
    this.searchFocused = !this.disabled;
  }

  onKeyPress(ev) {
    if (ev.keyCode === KEY_CODE_ENTER) {
      ev.preventDefault();
    }
  }

  getCss(): string {
    return 'select2-selection-container ' + (this.css === undefined ? '' : this.css);
  }

  getMinHeight(): string {
    const isInputSm: boolean = this.css === undefined ? false : this.css.indexOf('input-sm') !== -1;
    return isInputSm ? '30px' : '34px';
  }

  getPlaceholder(): string {
    return this.selectedItems.length > 0 ? this.placeholderSelected : this.placeholder;
  }

  isHideable(): boolean {
    return !this.multiple && this.placeholderSelected !== '';
  }

  focus(): void {
    this.termInput.nativeElement.focus();
  }

  getCountMessage(): string {
    let msg = this.messages && this.messages.moreResultsAvailableMsg ? this.messages.moreResultsAvailableMsg : this.MORE_RESULTS_MSG;
    msg = msg.replace(Messages.PARTIAL_COUNT_VAR, String(this.listData.length));
    msg = msg.replace(Messages.TOTAL_COUNT_VAR, String(this.resultsCount - this.selectedItems.length));
    return msg;
  }

  private subscribeToChangesAndLoadDataFromObservable() {
    const observable = this.term.valueChanges.pipe(
      debounceTime(this.searchDelay),
      distinctUntilChanged()
    );
    this.subscribeToResults(observable);
  }

  private subscribeToResults(observable: Observable<string>): void {
    observable.pipe(
      tap(() => this.resultsVisible = false),
      filter((term) => term.length >= this.minimumInputLength),
      switchMap(term => this.loadDataFromObservable(term)),
      map(items => items.filter(item => !(this.multiple && this.alreadySelected(item)))),
      tap(() => this.resultsVisible = this.searchFocused)
    ).subscribe((items) => this.listData = items);
  }

  private loadDataFromObservable(term: string): Observable<IqSelect2Item[]> {
    return this.clientMode ? this.fetchAndfilterLocalData(term) : this.fetchData(term);
  }

  private fetchAndfilterLocalData(term: string): Observable<IqSelect2Item[]> {
    if (!this.fullDataList) {
      return this.fetchData('').pipe(
        mergeMap((items) => {
          this.fullDataList = items;
          return this.filterLocalData(term);
        })
      );
    } else {
      return this.filterLocalData(term);
    }
  }

  private filterLocalData(term: string): Observable<IqSelect2Item[]> {
    return of(this.fullDataList.filter((item) => this.containsText(item, term)));
  }

  private containsText(item, term: string) {
    return item.text.toUpperCase().indexOf(term.toUpperCase()) !== -1;
  }

  private fetchData(term: string): Observable<IqSelect2Item[]> {
    if (this.dataList !== undefined) {
      return of(this.dataList)
        .pipe(map((items: any[]) => this.adaptItems(items)));
    } else {
      return this
        .dataSourceProvider(term, this.buildValue())
        .pipe(map((items: any[]) => this.adaptItems(items)));
    }

  }

  private adaptItems(items: any[]): IqSelect2Item[] {
    const convertedItems = [];
    items.map((item) => this.iqSelect2ItemAdapter(item))
      .forEach((iqSelect2Item) => convertedItems.push(iqSelect2Item));
    return convertedItems;
  }

  private populateItemsFromEntities(selectedValues: any) {
    if (this.multiple) {
      this.handleMultipleWithEntities(selectedValues);
    } else {
      const iqSelect2Item = this.iqSelect2ItemAdapter(selectedValues);
      this.selectedItems = [iqSelect2Item];
      this.placeholderSelected = iqSelect2Item.text;
    }
  }

  private handleMultipleWithEntities(selectedValues: any) {
    this.selectedItems = [];
    selectedValues.forEach((entity) => {
      const item = this.iqSelect2ItemAdapter(entity);
      const ids = this.getSelectedIds();

      if (ids.indexOf(item.id) === -1) {
        this.selectedItems.push(item);
      }
    });
  }

  private populateItemsFromIds(selectedValues: any) {
    if (this.multiple) {
      this.handleMultipleWithIds(selectedValues);
    } else {
      this.handleSingleWithId(selectedValues);
    }
  }

  private handleMultipleWithIds(selectedValues: any) {
    if (selectedValues !== undefined && this.selectedProvider !== undefined) {
      const uniqueIds = [];
      selectedValues.forEach((id) => {
        if (uniqueIds.indexOf(id) === -1) {
          uniqueIds.push(id);
        }
      });

      this.selectedProvider(uniqueIds).subscribe((items: any[]) => {
        this.selectedItems = items.map(this.iqSelect2ItemAdapter);
      });
    }
  }

  private handleSingleWithId(id: any) {
    if (id !== undefined && this.selectedProvider !== undefined) {
      this.selectedProvider([id]).subscribe((items: any[]) => {
        items.forEach((item) => {
          const iqSelect2Item = this.iqSelect2ItemAdapter(item);
          this.selectedItems = [iqSelect2Item];
          this.placeholderSelected = iqSelect2Item.text;
        });
      });
    }
  }

  private alreadySelected(item: IqSelect2Item): boolean {
    let result = false;
    this.selectedItems.forEach(selectedItem => {
      if (selectedItem.id === item.id) {
        result = true;
      }
    });
    return result;
  }

  private getSelectedIds(): any {
    if (this.multiple) {
      const ids: string[] = [];

      this.selectedItems.forEach(item => ids.push(item.id));

      return ids;
    } else {
      return this.selectedItems.length === 0 ? null : this.selectedItems[0].id;
    }
  }

  private getEntities(): any[] {
    if (this.multiple) {
      const entities = [];

      this.selectedItems.forEach(item => {
        entities.push(item.entity);
      });

      return entities;
    } else {
      return this.selectedItems.length === 0 ? null : this.selectedItems[0].entity;
    }
  }

  private buildValue() {
    return 'id' === this.referenceMode ? this.getSelectedIds() : this.getEntities();
  }

}
