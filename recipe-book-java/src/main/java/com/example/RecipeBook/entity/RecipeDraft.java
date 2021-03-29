package com.example.RecipeBook.entity;

import io.leangen.graphql.annotations.GraphQLQuery;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class RecipeDraft {

  @GraphQLQuery(name = "name")
  protected String name;

  @GraphQLQuery(name = "stars", description = "Overall average rating out of 5 stars")
  protected float stars = 0;

  @GraphQLQuery(name = "imageUrl", description = "Cover image for this recipe")
  protected String imageUrl;

  @GraphQLQuery(name = "instructions", description = "How to cook this recipe")
  protected String instructions = "";

  public String getName() {
    return name;
  }

  public RecipeDraft setName(String name) {
    this.name = name;
    return this;
  }

  public float getStars() {
    return this.stars;
  }

  public RecipeDraft setStars(float stars) {
    this.stars = stars;
    return this;
  }

  public String getImageUrl() {
    return this.imageUrl;
  }

  public RecipeDraft setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
    return this;
  }

  public String getInstructions() {
    return this.instructions;
  }

  public RecipeDraft setInstructions(String instructions) {
    this.instructions = instructions;
    return this;
  }
}
