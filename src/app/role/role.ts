import { Privilege } from "./privilege";

export class Role {
    id:number;
    name:string;
    privileges: Privilege[];
    constructor(name:string,privileges:Privilege[]){
        this.name=name;
        this.privileges = privileges;
    }
}
