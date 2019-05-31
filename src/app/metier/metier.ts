import { Output } from "@angular/core";
@Output()
export class Metier {
    id: number;
    name: string;

    constructor(id:number,name: string){
        this.name= name;
        this.id=id;
    };
}
