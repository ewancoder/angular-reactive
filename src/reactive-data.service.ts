import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { BusyService } from './busy.service';

export interface NameToValueMap
{
    [key: string]: any;
}

export abstract class ReactiveDataService<TEntity extends NameToValueMap> extends BusyService {
    private readonly _entities: BehaviorSubject<TEntity[]>;
    private readonly dataStore: {
        entities: TEntity[]
    };

    constructor(private readonly param: string) {
        super();

        this.dataStore = { entities: [] };
        this._entities = new BehaviorSubject<TEntity[]>([]);
    }

    protected get entities$(): Observable<TEntity[]> {
        return this._entities.asObservable();
    }

    /** Direct reference to entities array for custom operations. */
    protected get entities(): TEntity[] {
        return this.dataStore.entities;
    }

    protected updateEntities(entities: TEntity[]): void {
        this.dataStore.entities = entities;
        this.notifyEntitiesChanged();
    }

    protected updateEntity(entity: TEntity): void {
        let notFound = true;

        for (let i = 0, length = this.dataStore.entities.length; i < length; i++) {
            if (this.dataStore.entities[i][this.param] === entity[this.param]) {
                Object.assign(this.dataStore.entities[i], entity);
                notFound = false;
                break;
            }
        }

        if (notFound) {
            this.dataStore.entities.push(entity);
        }

        this.notifyEntitiesChanged();
    }

    protected deleteEntity(identifierValue: any): void {
        for (let i = 0, length = this.dataStore.entities.length; i < length; i++) {
            if (this.dataStore.entities[i][this.param] === identifierValue) {
                this.dataStore.entities.splice(i, 1);
                break;
            }
        }

        this.notifyEntitiesChanged();
    }

    protected clearEntities(): void {
        this.dataStore.entities = [];
        this.notifyEntitiesChanged();
    }

    protected notifyEntitiesChanged(): void {
        this._entities.next(Object.assign({}, this.dataStore).entities);
    }
}
