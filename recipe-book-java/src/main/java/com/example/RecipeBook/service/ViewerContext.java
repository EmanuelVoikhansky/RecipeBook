package com.example.RecipeBook.service;

import com.example.RecipeBook.dto.Login;
import com.example.RecipeBook.entity.*;
import com.example.RecipeBook.security.CheckLoginAspect;
import graphql.GraphQLException;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Keeps track of viewer context, whether they are logged in or not and if so as what user.
 * Providers API for log in, log out, and account retrieval. Backed by HttpServletRequest. In a
 * clusterd application this would be too primitive, you would need a cassandra or redis cluster to
 * support this class.
 */
@Component
public class ViewerContext {
  private static final String USER_ID = "userID";
  @Autowired private HttpServletRequest request;
  @Autowired private AuthorRepository authorRepo;

  public void login(Login login) {
    HttpSession session = request.getSession();
    session.setAttribute(CheckLoginAspect.TOKEN, login.getToken());
    session.setAttribute(USER_ID, login.getUser().getId());
  }

  public Optional<Author> getUser() {
    Object userId = request.getSession().getAttribute(USER_ID);
    if (userId == null) {
      return Optional.of(null);
    }
    return authorRepo.findById((long) userId);
  }

  public Author getUserX() throws GraphQLException {
    return getUser().orElseThrow(() -> new GraphQLException("User not logged in"));
  }
}
