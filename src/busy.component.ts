import { Observable } from 'rxjs/Observable';
import { BusyService } from './busy.service';

export abstract class BusyComponent {
    constructor(private readonly busy: BusyService) { }

    get isBusy$(): Observable<boolean> {
        return this.busy.isBusy$;
    }

    busyOn(): void {
        this.busy.busyOn();
    }

    busyOff(): void {
        this.busy.busyOff();
    }
}