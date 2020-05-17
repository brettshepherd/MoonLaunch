import { Observable, BehaviorSubject } from "rxjs";
import { pluck, distinctUntilChanged } from "rxjs/operators";
import { Injectable } from "@angular/core";

export interface State {
  [key: string]: any;
}

const state: State = {
  user: undefined,
};

@Injectable()
export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }
  setMerge(name: string, state: any) {
    this.subject.next({
      ...this.value,
      [name]: { ...this.value[name], ...state },
    });
  }

  getDirect<T>(name: string): T {
    return this.value[name];
  }
}
