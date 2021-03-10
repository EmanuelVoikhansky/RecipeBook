package com.evhansky.example;

import java.util.ArrayList;
import java.util.List;

/**
 * This example project does not use a database, this class works as an in memory alternative
 * whenever the server is restarted it will reset to it's hardcoded defaults.
 */
public class InMemoryDB {
  private final Author paul = new Author(1, "Paul Holly");
  private final Author rordon = new Author(2, "Rordon Gamsey");
  private final Recipe roastBeef =
      new Recipe(1, "Roast Beef", paul)
          .setInstructions(
              "Roast some beef for hours. Tender juice meat. No recomended for vegans");
  private final Recipe haggis =
      new Recipe(2, "Haggis", rordon)
          .setInstructions("All the parts of the sheep shoved into a sheep stomach!");
  private final Recipe omlette =
      new Recipe(3, "Omlette", paul).setInstructions("Non scrambled scrambled eggs");
  private final Recipe borscht =
      new Recipe(4, "Borscht", paul)
          .setInstructions("Beets. Lots and lots of purple. Vodka recommended");
  private final Recipe pastry =
      new Recipe(5, "Rough Puff Pastry", rordon)
          .setInstructions("Rough up some puff pastry. Ain't got time to wait");

  private List<Author> authors = new ArrayList<>();;
  private List<Recipe> recipes = new ArrayList<>();;

  public InMemoryDB() {
    authors.add(paul);
    authors.add(rordon);
    recipes.add(roastBeef);
    recipes.add(haggis);
    recipes.add(omlette);
    recipes.add(borscht);
    recipes.add(pastry);
  }

  public List<Recipe> getRecipes() {
    return this.recipes;
  }
}
