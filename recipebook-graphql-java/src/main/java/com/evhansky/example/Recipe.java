package com.evhansky.example;

public class Recipe {
  private int id;
  private String name;
  private int stars = 0;
  private String imageUrl = null;
  private String instructions = "";
  private Author author;

  public Recipe(int id, String name, Author author) {
    this.id = id;
    this.name = name;
    this.author = author;
  }

  public int getId() {
    return this.id;
  }

  public String getName() {
    return this.name;
  }

  public String getImageUrl() {
    return this.imageUrl;
  }

  public int getStars() {
    return this.stars;
  }

  public String getInstructions() {
    return this.instructions;
  }

  public Author getAuthor() {
    return this.author;
  }

  public Recipe setName(String name) {
    this.name = name;
    return this;
  }

  public Recipe setStars(int stars) {
    this.stars = stars;
    return this;
  }

  public Recipe setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
    return this;
  }

  public Recipe setInstructions(String instructions) {
    this.instructions = instructions;
    return this;
  }

  public Recipe setAuthor(Author author) {
    this.author = author;
    return this;
  }
}
