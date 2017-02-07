import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {
    getHeroes(): Promise<Hero[]> {
        // in commentaar omdat we hieronder een trage connectie nabootsen
        // return Promise.resolve(HEROES);

        return new Promise(resolve => {
            setTimeout(() => resolve(HEROES), 2000);
        });
    }
}