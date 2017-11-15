import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ReleaseService } from './../../services/release.service';

@Injectable()
export class ReleaseDetailsResolve implements Resolve<any> {

    constructor(private releaseService: ReleaseService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any     {
        let slug = route.params['slug'];
        
        return this.releaseService.getRelease(slug) 
    }
}