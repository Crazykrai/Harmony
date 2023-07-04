export interface UserTopitems {
    items: track[],
    topArtists: artist[],
}

interface track {
    name: string,
    id: string
}

interface artist {
    genres: string[],
    id: string,
    name: string
}