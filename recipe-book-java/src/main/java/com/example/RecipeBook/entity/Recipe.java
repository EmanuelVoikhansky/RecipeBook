package com.example.RecipeBook.entity;

import io.leangen.graphql.annotations.GraphQLQuery;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

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
  private String imageUrl;

  @GraphQLQuery(name = "instructions", description = "How to cook this recipe")
  private String instructions = "";

  @GraphQLQuery(name = "author", description = "Who wrote this recipe")
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "recipe_id", referencedColumnName = "id")
  private Author author;

  public Recipe() {}

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

  public String getImageUrl() {
    return this.imageUrl;
  }

  public Recipe setImageUrl(String imageUrl) {
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

  public Recipe setAuthor(Author author) {
    this.author = author;
    return this;
  }

  public Author getAuthor() {
    return this.author;
  }
}
