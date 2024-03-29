export interface IProduct{
    order: string,
    client: string;
    status: string,
    invoice: string;
    total: number,
    currency: string,
    fundingMethod: string,
}

export interface IDataProduct{
    id: string | number;
    client: string;
    order: string;
    createdBy: string;
    currency: string;
    fundingMethod: string;
    invoice: string;
    status: string;
    total: number;
    createdAt: string;
    updatedAt: string;
}


export interface IlistDataProduct{
    code: number;
    message: string;
    error: boolean;
    data: IlistDataProduct[];
}

export interface IUpdateProduct{
    code: number;
    message: string;
    error: boolean;
}

export interface ICreateProduct{
    code: number;
    message: string;
    error: boolean;
}