package com.example.RecipeBook.service;

import com.example.RecipeBook.dto.Login;
import com.example.RecipeBook.entity.*;
import com.example.RecipeBook.security.LoginRequired;
import graphql.GraphQLException;
import io.leangen.graphql.annotations.GraphQLArgument;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLQuery;
import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

@Service
@GraphQLApi
public class GraphQLService {

  @Autowired private RecipeRepository recipeRepo;
  @Autowired private AuthorRepository authorRepo;
  @Autowired private ViewerContext context;

  @GraphQLMutation(name = "login", description = "attempts login with given credentials")
  public Login login(
      @GraphQLArgument(name = "email") String email,
      @GraphQLArgument(name = "password") String passwordAttempt)
      throws GraphQLException {
    Author user =
        authorRepo
            .findOne(Example.of(new Author(email, passwordAttempt)))
            .orElseThrow(() -> new GraphQLException("Invalid login"));
    Login login = new Login(user);
    context.login(login);
    return login;
  }

  @GraphQLQuery(name = "all_recipes")
  public List<Recipe> getAllRecipes() {
    return recipeRepo.findAll();
  }

  @GraphQLQuery(name = "recipe", description = "get a recipe by ID")
  public Optional<Recipe> getRecipeById(@GraphQLArgument(name = "id") Long id) {
    return recipeRepo.findById(id);
  }

  @GraphQLMutation(
    name = "saveRecipe",
    description = "save/update a recipe. Leave id blank for new recipe, specify it for an update"
  )
  @LoginRequired
  public Recipe saveRecipe(
      @GraphQLArgument(name = "recipe") RecipeDraft draft, @GraphQLArgument(name = "id") Long id) {
    Recipe toUpsert = new Recipe(draft);
    Author originalAuthor = context.getUserX();
    if (id != null) {
      Recipe existing = loadRecipeById(id);
      if (existing.getAuthor().getId() != originalAuthor.getId()) {
        throw new GraphQLException("You can only edit recipes you own");
      }
      toUpsert.setId(id);
    }
    toUpsert.setAuthor(originalAuthor);
    return recipeRepo.save(toUpsert);
  }

  @GraphQLMutation(name = "deleteRecipe")
  @LoginRequired
  public void deleteRecipe(@GraphQLArgument(name = "id") Long id) {
    Recipe toDelete = loadRecipeById(id);
    Author user = context.getUserX();
    if (toDelete.getAuthor().getId() != user.getId()) {
      throw new GraphQLException("You can only delete recipes you own");
    }
    recipeRepo.deleteById(toDelete.getId());
  }

  private Recipe loadRecipeById(long id) {
    return recipeRepo.findById(id).orElseThrow(() -> new GraphQLException("Not found"));
  }
}
