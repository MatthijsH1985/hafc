import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _isOpen = new BehaviorSubject<boolean>(false);

  get isOpen() {
    return this._isOpen.asObservable();
  }

  open() {
    this._isOpen.next(true);
  }

  close() {
    this._isOpen.next(false);
  }

  toggle() {
    this._isOpen.next(!this._isOpen.value);
  }
}
