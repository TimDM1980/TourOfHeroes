import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ],
})
export class HeroesComponent implements OnInit { 
  heroes: Hero[];
  
  selectedHero: Hero; 

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit(): void {
    this.getHeroes();  
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  gotoDetail() {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }

    this.heroService
      .create(name)
      // oplossing om verkregen hero in de array te pushen vind ik niet OK
      // beter is om de heroes te reloaden
      // .then(heroCreated => {
      //   this.heroes.push(heroCreated);
      //   this.selectedHero = null;
      .then(() => {
        //reloaden door te navigeren werkt niet, ngInit gaat niet af als route niet verandert
        //this.router.navigate(['/heroes']);
        this.getHeroes();
      });
  }
}