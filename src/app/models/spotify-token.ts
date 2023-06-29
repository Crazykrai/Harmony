export interface SpotifyToken {
    access_token: string;
    scope: string;
    tokenType: string;
    expiresIn: number;
    refreshToken: string;
}
