import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class BusyService {
    private readonly isBusy: BehaviorSubject<boolean>;

    constructor() {
        this.isBusy = new BehaviorSubject<boolean>(false);
    }

    get isBusy$(): Observable<boolean> {
        return this.isBusy.asObservable();
    }

    busySession<T>(action: Observable<T>): Observable<T> {
        return Observable.of(undefined).do(_ => this.busyOn())
            .flatMap(_ => action)
            .do(_ => this.busyOff(), _ => this.busyOff());
    }

    busyOn(): void {
        this.isBusy.next(true);
    }

    busyOff(): void {
        this.isBusy.next(false);
    }
}
