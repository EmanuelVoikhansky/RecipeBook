package com.evhansky.example;

public class Author {
  private int id;
  private String name;
  private String profilePicUrl;

  public Author(int id, String name) {
    this.id = id;
    this.name = name;
  }

  public int getId() {
    return this.id;
  }

  public String getName() {
    return this.name;
  }

  public String getProfilePicUrl() {
    return this.profilePicUrl;
  }

  public Author setProfilePicUrl(String url) {
    this.profilePicUrl = url;
    return this;
  }

  public Author setName(String name) {
    this.name = name;
    return this;
  }
}
