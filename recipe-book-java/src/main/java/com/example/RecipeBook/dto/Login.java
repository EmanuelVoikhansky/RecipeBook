package com.example.RecipeBook.dto;

import com.example.RecipeBook.entity.Author;
import io.leangen.graphql.annotations.GraphQLQuery;
import java.util.UUID;

public class Login {
  @GraphQLQuery(name = "account")
  private Author user;

  @GraphQLQuery(name = "token", description = "Pass this back with all subsequent requests")
  private String token = UUID.randomUUID().toString();

  public Login(Author user) {
    this.user = user;
  }

  public Author getUser() {
    return this.user;
  }

  public String getToken() {
    return this.token;
  }
}
