export class AppSettings {
  public static frontendUrl: string = "http://localhost:4200";

  public static tkServiceUrl: string = "http://localhost:8087";

  public static authServiceUrl: string = "http://localhost:8086";

  public static spotifyServiceUri: string = "https://api.spotify.com";

  public static spotifyCredentialsUri: string = "https://accounts.spotify.com";

  public static spotifyClientId: string = "750ea4f964cb4012a1ac34c50654ae7f";

  public static spotifyScope: string = "user-follow-read%20user-follow-modify%20user-library-read%20user-library-modify%20playlist-modify-public%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-private%20user-read-private%20user-read-email%20user-top-read%20user-read-birthdate";

  public static loadImage: string = "assets/images/preload-image.jpg";

  public static errorImage: string = "assets/images/error-image.jpg";

  public static defaultFeatureVideo: string = "";

  public static defaultFeaturePoster: string = "";

  public static defaultUserImage: string = '/assets/images/default-profile.png';

  public static lazyLoadOffest: number = 350;
}