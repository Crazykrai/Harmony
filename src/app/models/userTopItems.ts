export interface UserTopSongs {
    items: track[],
}

export interface UserTopArtists {
    items: artist[],
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