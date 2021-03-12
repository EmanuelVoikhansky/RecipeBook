package com.example.RecipeBook;

import com.example.RecipeBook.entity.*;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RecipeBookApplication implements ApplicationRunner {

  @Autowired private AuthorRepository authorRepo;
  @Autowired private RecipeRepository recipeRepo;

  public static void main(String[] args) {
    SpringApplication.run(RecipeBookApplication.class, args);
  }

  // setting up test data to play with
  @Override
  public void run(ApplicationArguments args) throws Exception {
    Author paul = new Author("paul.holly@gmail.com", "handshake").setName("Paul Holly");
    Author rordon =
        new Author("bunchofFkingExplatives@gmail.com", "youDonkey!!").setName("Rordon Gamsey");
    Recipe roastBeef = new Recipe(paul, "Roast Beef", "roast some beef");
    Recipe omlette = new Recipe(paul, "Omlette", "non scrambled scrambled eggs");
    Recipe haggis =
        new Recipe(rordon, "Haggis", "All the parts of a sheep shoved into a sheep stomach");
    Recipe borscht = new Recipe(rordon, "Borscht", "Beets. Lots and lots of purple");
    Recipe puffPastry =
        new Recipe(
            paul, "Puff Pastry", "Don't ask how much butter to use. The answer is ALL OF IT");

    recipeRepo.saveAll(Arrays.asList(roastBeef, omlette, haggis, borscht, puffPastry));
    authorRepo.saveAll(Arrays.asList(paul, rordon));
  }
}
