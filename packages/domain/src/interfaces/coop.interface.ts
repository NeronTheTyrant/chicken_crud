import { Chicken } from "./chicken.interface";

export interface Coop {
    id: number;
    name: string;
    chickens: Chicken[];
}