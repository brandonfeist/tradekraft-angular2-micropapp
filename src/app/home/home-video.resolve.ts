import { VideoService } from './../services/video.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HomeVideoResolve implements Resolve<any> {

    constructor(private videoService: VideoService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any     {
        return this.videoService.getRandomFeaturedVideo();
    }
}