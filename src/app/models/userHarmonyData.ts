import { Post } from "./post"
import { SpotifyRecommendation } from "./spotifyRecommendation"

export interface UserHarmonyData {
    displayName: string,
    email: string,
    imageUrl: string,
    friends: string[],
    posts: Post[],
    recommendations: SpotifyRecommendation[],
    topGenre: string
}
