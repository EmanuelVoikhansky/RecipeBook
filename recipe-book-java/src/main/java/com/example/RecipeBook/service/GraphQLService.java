package com.example.RecipeBook.service;

import com.example.RecipeBook.dto.Login;
import com.example.RecipeBook.entity.*;
import graphql.GraphQLException;
import io.leangen.graphql.annotations.GraphQLArgument;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLQuery;
import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

@Service
@GraphQLApi
public class GraphQLService {

  private final RecipeRepository recipeRepo;
  private final AuthorRepository authorRepo;

  public GraphQLService(RecipeRepository recipeRepo, AuthorRepository authorRepo) {
    this.recipeRepo = recipeRepo;
    this.authorRepo = authorRepo;
  }

  @GraphQLQuery(name = "login", description = "attempts login with given credentials")
  public Login login(
      @GraphQLArgument(name = "email") String email,
      @GraphQLArgument(name = "password") String passwordAttempt)
      throws GraphQLException {
    Author user =
        authorRepo
            .findOne(Example.of(new Author(email, passwordAttempt)))
            .orElseThrow(() -> new GraphQLException("Invalid login"));
    return new Login(user);
  }

  @GraphQLQuery(name = "all_recipes")
  public List<Recipe> getAllRecipes() {
    return recipeRepo.findAll();
  }

  @GraphQLQuery(name = "authors")
  public List<Author> getAllAuthors() {
    return authorRepo.findAll();
  }

  @GraphQLQuery(name = "recipe", description = "get a recipe by ID")
  public Optional<Recipe> getRecipeById(@GraphQLArgument(name = "id") Long id) {
    return recipeRepo.findById(id);
  }

  @GraphQLMutation(name = "saveRecipe", description = "save/update a recipe")
  public Recipe saveRecipe(@GraphQLArgument(name = "recipe") Recipe recipe) {
    return recipeRepo.save(recipe);
  }

  @GraphQLMutation(name = "deleteRecipe")
  public void deleteRecipe(@GraphQLArgument(name = "id") Long id) {
    recipeRepo.deleteById(id);
  }
}
