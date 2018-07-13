import { SongService } from 'app/services/song.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AdminVideoSongsResolve implements Resolve<any> {

    constructor(private songService: SongService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any     {
        return this.songService.getSongs(); 
    }
}