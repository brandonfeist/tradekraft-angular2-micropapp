import { YearService } from './../services/year.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ArtistYearsResolve implements Resolve<any> {

    constructor(private YearService: YearService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any     {
        return this.YearService.getYears() 
    }
}