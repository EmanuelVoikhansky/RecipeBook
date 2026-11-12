import { Injectable, type OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Author } from './entity/author.entity.js';
import { Recipe } from './entity/recipe.entity.js';

/** Same test data RecipeBookApplication.run() loaded into H2 on startup. */
@Injectable()
export class DevDataSeeder implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Author) private readonly authors: Repository<Author>,
    @InjectRepository(Recipe) private readonly recipes: Repository<Recipe>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    if ((await this.authors.count()) > 0) return;

    const paul = Author.create('paul.holly@gmail.com', 'handshake', 'Paul Holly');
    const rordon = Author.create('bunchofFkingExplatives@gmail.com', 'youDonkey!!', 'Rordon Gamsey');
    await this.authors.save([paul, rordon]);

    await this.recipes.save([
      Recipe.create(paul, 'Roast Beef', 'roast some beef'),
      Recipe.create(paul, 'Omlette', 'non scrambled scrambled eggs'),
      Recipe.create(rordon, 'Haggis', 'All the parts of a sheep shoved into a sheep stomach'),
      Recipe.create(rordon, 'Borscht', 'Beets. Lots and lots of purple'),
      Recipe.create(paul, 'Puff Pastry', "Don't ask how much butter to use. The answer is ALL OF IT"),
    ]);
  }
}
