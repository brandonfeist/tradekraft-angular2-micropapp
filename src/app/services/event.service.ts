import { HttpRequest } from '@angular/common/http';
import { AppSettings } from 'app/app-settings';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {
    private tkServiceUrl: string;

    constructor(private http: Http, private authHttp: AuthHttp) {
        this.tkServiceUrl = AppSettings.tkServiceUrl;
    }

    createEvent(eventData) {
        return this.authHttp.post(this.tkServiceUrl + '/v1/events', eventData)
        .map((res:Response) => res.json());
    }

    uploadEventImage(eventImageFile: File) {
        let formData: FormData = new FormData();
        formData.append('image', eventImageFile, eventImageFile.name);

        return new HttpRequest('POST', this.tkServiceUrl + '/v1/events/image', formData, { 
            reportProgress: true
        });
    }

    getEvents(parameters?: URLSearchParams) {
        return this.http.get(this.tkServiceUrl + '/v1/events',
        { params: parameters })
        .map((res:Response) => res.json());
    }

    getEvent(slug: string) {
        return this.http.get(this.tkServiceUrl + '/v1/events/' + slug,)
        .map((res:Response) => res.json());
    }

    deleteEvent(eventSlug: string) {
        return this.authHttp.delete(this.tkServiceUrl + '/v1/events/' + eventSlug)
        .map((res:Response) => res.json());
    }

    updateEvent(eventSlug: string, eventUpdates: Event) {
        return this.authHttp.put(this.tkServiceUrl + '/v1/events/' + eventSlug, eventUpdates)
        .map((res:Response) => res.json());
    }
}
