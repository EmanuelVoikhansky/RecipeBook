package com.example.RecipeBook.entity;

import io.leangen.graphql.annotations.GraphQLIgnore;
import io.leangen.graphql.annotations.GraphQLQuery;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Authors")
public class Author {
  @Id
  @GeneratedValue
  @GraphQLQuery(name = "id", description = "Auto generated on creation, do not set")
  @Column(name = "id")
  private Long id;

  @GraphQLQuery(name = "name")
  private String name;

  @GraphQLQuery(name = "profilePicUrl", description = "URL of the authors profile pic")
  private String imageUrl;

  @GraphQLIgnore private String email;
  // in a real app this should NEVER be a plain string. This is for example only.
  private String password;

  public Author() {}

  public Author(String email, String password) {
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

  public String getImageUrl() {
    return this.imageUrl;
  }

  public Author setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
    return this;
  }

  @GraphQLIgnore
  public String getEmail() {
    return this.email;
  }

  @GraphQLIgnore
  public boolean isValidLogin(String passwordAttempt) {
    return this.password.equals(passwordAttempt);
  }
}
