import { Metier } from '../metier/metier';
import { Output } from '@angular/core';
import { Periodessai} from '../periodessai/periodessai';

export class Collaborateur {
     collaborateurId : number;
    outlookMail: string;
  namee: string;
     newCol: boolean;
    private dateArrivee: Date;
  metier: Metier;
 manager : Collaborateur;
 periodessai: Periodessai;
    constructor(collaborateurId?: number,outlookMail?: string, namee?: string,newCol?: boolean,dateArrivee?: Date
      , metier?: Metier,manager?: Collaborateur) {
        this.outlookMail = outlookMail;
        this.namee = namee;
        this.metier = metier;
        this.collaborateurId = collaborateurId;
        this.newCol = newCol;
        this.dateArrivee = dateArrivee;
        this.manager = manager;
      
    }
}
