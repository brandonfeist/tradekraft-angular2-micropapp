import { AuthHttp } from 'angular2-jwt';
import { AppSettings } from 'app/app-settings';
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VideoService {
    private tkServiceUrl: string;

    constructor(private http: Http, private authHttp: AuthHttp) {
        this.tkServiceUrl = AppSettings.tkServiceUrl;
    }

    createVideo(videoData) {
        return this.authHttp.post(this.tkServiceUrl + '/v1/videos', videoData)
        .map((res:Response) => res.json());
    }

    uploadVideoFile(videoSlug: string, videoFile: File, startRange: number, endRange: number) {
        let formData: FormData = new FormData();
        formData.append('video-slug', videoSlug);
        formData.append('video', videoFile, videoFile.name);
        formData.append('preview-start', (startRange * 1000).toString());
        formData.append('preview-end', (endRange * 1000).toString());

        return this.authHttp.post(this.tkServiceUrl + '/v1/videos/video', formData)
        .map((res:Response) => res.json());
    }

    getRandomFeaturedVideo(parameters?: URLSearchParams) {
        return this.http.get(this.tkServiceUrl + '/v1/videos/randomFeature',
        { params: parameters })
        .map((res:Response) => res.json());
    }

    getVideos() {
        return this.http.get(this.tkServiceUrl + '/v1/videos')
        .map((res: Response) => res.json());
    }

    deleteVideo(videoSlug: string) {
        return this.authHttp.delete(this.tkServiceUrl + '/v1/videos/' + videoSlug)
        .map((res:Response) => res.json());
    }
}
