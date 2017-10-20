import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ArtistService } from './../artist.service';

@Injectable()
export class ArtistDetailsResolve implements Resolve<any> {

    constructor(private artistService: ArtistService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any     {
        let slug = route.params['slug'];
        
        return this.artistService.getArtist(slug) 
    }
}