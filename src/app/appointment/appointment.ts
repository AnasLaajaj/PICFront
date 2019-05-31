import { Collaborateur } from "../collaborateur/collaborateur";
import { Periodessai } from "../periodessai/periodessai";

export class Appointment {
    private idAppointment: number;
    private startTime: Date;
    private endTime: Date;
    private codeAppointment: string;
    private reponse: string;
    private collaborateurs : Collaborateur[];
    private periodessai: Periodessai;
    private ordreAppPeriodE: number;
    constructor (idAppointment: number, startTime: Date, endTime, codeAppointment: string,
         reponse:string,collaborateurs : Collaborateur[], periodessai?: Periodessai)
    {
        this.idAppointment = idAppointment;
        this.startTime = startTime;
        this.endTime = endTime;
        this.codeAppointment=codeAppointment;
        this.reponse=reponse;
        this.collaborateurs = collaborateurs;
        this.periodessai=periodessai;
    }
}
