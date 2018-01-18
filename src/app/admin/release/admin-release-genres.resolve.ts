import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { GenreService } from 'app/services/genre.service';

@Injectable()
export class AdminReleaseGenresResolve implements Resolve<any> {

    constructor(private genreService: GenreService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any     {        
        return this.genreService.getGenres();
    }
}