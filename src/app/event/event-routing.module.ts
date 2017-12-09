import { EventDetailsResolve } from './event-details/event-details.resolve';
import { EventDetailsComponent } from 'app/event/event-details/event-details.component';
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
            },
            {
                path:":slug",
                component: EventDetailsComponent,
                resolve: { event: EventDetailsResolve }
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class EventRoutingModule {}