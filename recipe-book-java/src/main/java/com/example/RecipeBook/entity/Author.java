package com.example.RecipeBook.entity;

import io.leangen.graphql.annotations.GraphQLQuery;
import java.util.Optional;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Author {
  @Id
  @GeneratedValue
  @GraphQLQuery(name = "id")
  private Long id;

  @GraphQLQuery(name = "name")
  private String name;

  @GraphQLQuery(name = "profilePicUrl", description = "URL of the authors profile pic")
  private Optional<String> imageUrl = null;

  private String email;
  // in a real app this should NEVER be a plain string. This is for example only.
  private String password;

  public Author(String name, String email, String password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public Long getId() {
    return this.id;
  }

  public String getName() {
    return this.name;
  }

  public Author setName(String name) {
    this.name = name;
    return this;
  }

  public Optional<String> getImageUrl() {
    return this.imageUrl;
  }

  public Author setImageUrl(Optional<String> imageUrl) {
    this.imageUrl = imageUrl;
    return this;
  }

  public String getEmail() {
    return this.email;
  }

  public boolean isValidLogin(String passwordAttempt) {
    return this.password.equals(passwordAttempt);
  }
}
