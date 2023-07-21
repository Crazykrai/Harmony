export interface UserData {
    display_name: string;
    email: string;
    images: image[];
    
}

interface image {
    url: string;
    height: number;
    width: number;
}
