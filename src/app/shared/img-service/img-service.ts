import { Injectable } from "@angular/core";

@Injectable()
export class ImgService {
  public getImage(object, width: number, height: number): string {
    if(object.image && object.image.link) {
      return object.image.link;
    }

    return undefined;
  }
}