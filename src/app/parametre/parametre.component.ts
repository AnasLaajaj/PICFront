import { Component, OnInit } from '@angular/core';
import { ParametreService } from './parametre.service';
import { Parametre } from './parametre';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent implements OnInit {

  private parametres: Parametre[] = [];
  constructor(private parametreService : ParametreService) { }

  ngOnInit() {
    this.parametreService.getParametres().subscribe((data) => this.parametres = data);
  }
  save(parametre: Parametre){
    this.parametreService.saveParametre(parametre).subscribe((data) => console.log(data));
  }

}
