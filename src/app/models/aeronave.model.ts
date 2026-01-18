export enum Marca{
    Embraer = "Embraer",
    Boeing = "Boeing",
    Airbus = "Airbus",
    ATR = "ATR",
    Bombardier = "Bombardier",
    Ilyushin = "Ilyushin",
}

export interface Aeronave{
    id:number;
    nome:string;
    marca:Marca;
    ano:number;
    descricao:string;
    vendido:boolean;
    criado:string;
    atualizado:string;
}

export const MARCAS:Marca[] = Object.values(Marca)