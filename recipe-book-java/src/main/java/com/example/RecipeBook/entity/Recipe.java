package com.example.RecipeBook.entity;

import io.leangen.graphql.annotations.GraphQLQuery;
import java.util.Optional;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Recipe {
  @Id
  @GeneratedValue
  @GraphQLQuery(name = "id")
  private Long id;

  @GraphQLQuery(name = "name")
  private String name;

  @GraphQLQuery(name = "stars", description = "Overall average rating out of 5 stars")
  private float stars = 0;

  @GraphQLQuery(name = "imageUrl", description = "Cover image for this recipe")
  private Optional<String> imageUrl = null;

  @GraphQLQuery(name = "instructions", description = "How to cook this recipe")
  private String instructions = "";

  @GraphQLQuery(name = "author", description = "Who wrote this recipe")
  private Author author;

  public Recipe(Author author, String name, String instructions) {
    this.author = author;
    this.name = name;
    this.instructions = instructions;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public Recipe setName(String name) {
    this.name = name;
    return this;
  }

  public float getStars() {
    return this.stars;
  }

  public Recipe setStars(float stars) {
    this.stars = stars;
    return this;
  }

  public Optional<String> getImageUrl() {
    return this.imageUrl;
  }

  public Recipe setImageUrl(Optional<String> imageUrl) {
    this.imageUrl = imageUrl;
    return this;
  }

  public String getInstructions() {
    return this.instructions;
  }

  public Recipe setInstructions(String instructions) {
    this.instructions = instructions;
    return this;
  }

  public Author getAuthor() {
    return this.author;
  }
}
