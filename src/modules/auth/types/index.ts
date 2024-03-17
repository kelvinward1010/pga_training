export interface LoginParams {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface LoginValidation{
    email: string;
    password: string;
}


export interface ISignUpParams {
    email: string;
    password: string;
    repeatPassword: string;
    name: string;
    gender: string;
    region: string;
    state: string;
}

export interface IGenderParams {
    label: string;
    value: string;
}

export interface ILocationParams {
    id: string | number;
    name: string;
    pid: number | null;
}