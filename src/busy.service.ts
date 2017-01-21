import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BusyService {
    private readonly isBusy: BehaviorSubject<boolean>;

    constructor() {
        this.isBusy = new BehaviorSubject<boolean>(false);
    }

    get isBusy$(): Observable<boolean> {
        return this.isBusy.asObservable();
    }

    busyOn(): void {
        this.isBusy.next(true);
    }

    busyOff(): void {
        this.isBusy.next(false);
    }
}
