import {Card} from "./Card"

export interface Section {
    id: number;
    titulo :string;
    tipo: string;
    data: Card[];
}