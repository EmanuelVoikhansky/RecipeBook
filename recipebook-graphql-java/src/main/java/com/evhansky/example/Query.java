package com.evhansky.example;

import com.coxautodev.graphql.tools.GraphQLRootResolver;
import java.util.List;

public class Query implements GraphQLRootResolver {

  private final InMemoryDB db;

  public Query(InMemoryDB db) {
    this.db = db;
  }

  public List<Recipe> allRecipes() {
    return db.getRecipes();
  }
}
