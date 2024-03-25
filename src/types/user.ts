export interface User{
    email: string;
    password: string;
    name: string;
    gender: string;
    region: string;
    state: string;
    token: string;
    avatar?: string;
    description?: string;
}

export interface ItemType{
    id: string;
    value: string;
}