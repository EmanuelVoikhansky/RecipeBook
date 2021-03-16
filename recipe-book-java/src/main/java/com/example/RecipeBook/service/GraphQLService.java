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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

@Service
@GraphQLApi
public class GraphQLService {

  @Autowired private RecipeRepository recipeRepo;
  @Autowired private AuthorRepository authorRepo;
  @Autowired private HttpServletRequest request;

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
    // in a real app I'd set up a clustered solution. Redis or a Cassandra node with TTL.
    HttpSession session = request.getSession();
    session.setAttribute("token", login.getToken());
    session.setAttribute("user", user);
    return login;
  }

  @GraphQLQuery(name = "all_recipes")
  public List<Recipe> getAllRecipes() {
    return recipeRepo.findAll();
  }

  @GraphQLQuery(name = "authors")
  @LoginRequired
  public List<Author> getAllAuthors() {
    return authorRepo.findAll();
  }

  @GraphQLQuery(name = "recipe", description = "get a recipe by ID")
  public Optional<Recipe> getRecipeById(@GraphQLArgument(name = "id") Long id) {
    return recipeRepo.findById(id);
  }

  @GraphQLMutation(name = "saveRecipe", description = "save/update a recipe")
  @LoginRequired
  public Recipe saveRecipe(@GraphQLArgument(name = "recipe") Recipe recipe) {
    return recipeRepo.save(recipe);
  }

  @GraphQLMutation(name = "deleteRecipe")
  @LoginRequired
  public void deleteRecipe(@GraphQLArgument(name = "id") Long id) {
    recipeRepo.deleteById(id);
  }
}
