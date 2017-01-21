import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({})
export class ReactiveModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ReactiveModule,
            providers: []
        }
    }
}
