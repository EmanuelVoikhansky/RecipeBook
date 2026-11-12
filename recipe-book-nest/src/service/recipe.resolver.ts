import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import type { Repository } from 'typeorm';
import { Login } from '../dto/login.js';
import { Author } from '../entity/author.entity.js';
import { RecipeDraftInput } from '../entity/recipe-draft.input.js';
import { Recipe } from '../entity/recipe.entity.js';
import { GraphQLLong } from '../graphql/long.scalar.js';
import { LoginRequired } from '../security/login-required.decorator.js';
import { ViewerContext } from './viewer-context.js';

const notFound = () => new GraphQLError('Not found', { extensions: { code: 'NOT_FOUND' } });
const forbidden = (message: string) => new GraphQLError(message, { extensions: { code: 'FORBIDDEN' } });

/** Port of GraphQLService: same operation names, arguments, nullability and descriptions. */
@Resolver()
export class RecipeResolver {
  constructor(
    @InjectRepository(Recipe) private readonly recipes: Repository<Recipe>,
    @InjectRepository(Author) private readonly authors: Repository<Author>,
    private readonly context: ViewerContext,
  ) {}

  @Mutation(() => Login, { nullable: true, description: 'attempts login with given credentials' })
  async login(
    @Args('email', { type: () => String, nullable: true }) email: string | null,
    @Args('password', { type: () => String, nullable: true }) passwordAttempt: string | null,
  ): Promise<Login> {
    // Both are required: a lookup on a missing email would otherwise match any author.
    const user = email && passwordAttempt ? await this.authors.findOneBy({ email }) : null;
    if (!user || !user.isValidLogin(passwordAttempt!)) {
      throw new GraphQLError('Invalid login', { extensions: { code: 'UNAUTHENTICATED' } });
    }
    const login = new Login(user);
    this.context.login(login);
    return login;
  }

  @Query(() => [Recipe], { name: 'all_recipes', nullable: 'itemsAndList' })
  getAllRecipes(): Promise<Recipe[]> {
    return this.recipes.find({ order: { id: 'ASC' } });
  }

  @Query(() => Recipe, { name: 'recipe', nullable: true, description: 'get a recipe by ID' })
  getRecipeById(@Args('id', { type: () => GraphQLLong, nullable: true }) id: number | null): Promise<Recipe | null> {
    return id == null ? Promise.resolve(null) : this.recipes.findOneBy({ id });
  }

  @Mutation(() => Recipe, {
    nullable: true,
    description: 'save/update a recipe. Leave id blank for new recipe, specify it for an update',
  })
  @LoginRequired()
  async saveRecipe(
    @Args('recipe', { type: () => RecipeDraftInput, nullable: true }) draft: RecipeDraftInput | null,
    @Args('id', { type: () => GraphQLLong, nullable: true }) id: number | null,
  ): Promise<Recipe> {
    if (!draft) throw new GraphQLError('A recipe is required', { extensions: { code: 'BAD_USER_INPUT' } });
    const toUpsert = Recipe.fromDraft(draft);
    const originalAuthor = await this.context.getUserX();
    if (id != null) {
      const existing = await this.loadRecipeById(id);
      if (existing.author.id !== originalAuthor.id) throw forbidden('You can only edit recipes you own');
      toUpsert.id = id;
    }
    toUpsert.author = originalAuthor;
    return this.recipes.save(toUpsert);
  }

  @Mutation(() => Boolean)
  @LoginRequired()
  async deleteRecipe(@Args('id', { type: () => GraphQLLong, nullable: true }) id: number | null): Promise<boolean> {
    if (id == null) throw notFound();
    const toDelete = await this.loadRecipeById(id);
    const user = await this.context.getUserX();
    if (toDelete.author.id !== user.id) throw forbidden('You can only delete recipes you own');
    await this.recipes.delete(toDelete.id);
    return true;
  }

  private async loadRecipeById(id: number): Promise<Recipe> {
    const recipe = await this.recipes.findOneBy({ id });
    if (!recipe) throw notFound();
    return recipe;
  }
}
