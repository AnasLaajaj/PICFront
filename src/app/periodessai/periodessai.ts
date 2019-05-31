import { Collaborateur } from "../collaborateur/collaborateur";
import { Appointment } from "../appointment/appointment";

export class Periodessai {
    private periodessaiId: number;
    private startDate: Date;
    private collaborateur: Collaborateur;
    private etat: string;
    private duree:string;
     appointments: Appointment[];
    constructor(startDate: Date, collaborateur: Collaborateur,duree?: string, etat?: string)
    {
this.startDate = startDate;
this.collaborateur = collaborateur;
this.duree = duree;
this.etat = etat;
    }
}
