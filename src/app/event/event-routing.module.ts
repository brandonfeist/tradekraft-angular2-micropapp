import { HighlightedEventResolve } from './highlighted-event.resolve';
import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';

import { EventComponent } from './event.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: EventComponent,
                resolve: { highlightedEvent: HighlightedEventResolve }
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class EventRoutingModule {}