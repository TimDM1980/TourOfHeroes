import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
        // in commentaar omdat we hieronder een trage connectie nabootsen
        // return Promise.resolve(HEROES);

        // in commentaar omdat we met backend api gaan werken
        // return new Promise(resolve => {
        //     setTimeout(() => resolve(HEROES), 500);
        // });

        return this.http.get('api/heroes')
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }

    getHero(id: number): Promise<Hero> {
        return this.http.get(`api/heroes/${id}`)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero> {
        return this.http.put(`api/heroes/${hero.id}`, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        return this.http.post('api/heroes', JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}