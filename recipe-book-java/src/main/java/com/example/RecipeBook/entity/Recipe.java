package com.example.RecipeBook.entity;

import io.leangen.graphql.annotations.GraphQLQuery;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class Recipe extends RecipeDraft {
  @Id
  @GeneratedValue
  @GraphQLQuery(name = "id")
  private Long id;

  @GraphQLQuery(name = "author", description = "Who wrote this recipe")
  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "recipe_id", referencedColumnName = "id")
  private Author author;

  public Recipe() {}

  public Recipe(Author author, String name, String instructions) {
    this.author = author;
    this.name = name;
    this.instructions = instructions;
  }

  public Recipe(RecipeDraft draft) {
    this.name = draft.name;
    this.stars = draft.stars;
    this.instructions = draft.instructions;
    this.imageUrl = draft.imageUrl;
  }

  public Long getId() {
    return id;
  }

  public Recipe setId(Long id) {
    this.id = id;
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
