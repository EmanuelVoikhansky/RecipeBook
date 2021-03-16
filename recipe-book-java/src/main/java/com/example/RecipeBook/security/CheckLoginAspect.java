package com.example.RecipeBook.security;

import graphql.GraphQLException;
import javax.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class CheckLoginAspect {
  @Autowired private HttpServletRequest request;

  @Pointcut("execution(@com.example.RecipeBook.security.LoginRequired * *(..))")
  public void methodRequiresLogin() {}

  @Pointcut("execution(public * *(..))")
  public void publicMethod() {}

  @Pointcut("execution(@io.leangen.graphql.annotations.GraphQLQuery * *(..))")
  public void methodAnnotatedWithGraphQLQuery() {}

  @Pointcut("execution(@io.leangen.graphql.annotations.GraphQLMutation * *(..))")
  public void methodAnnotatedWithGraphQLMutation() {}

  @Around(
      "publicMethod() && methodRequiresLogin() && (methodAnnotatedWithGraphQLQuery() || methodAnnotatedWithGraphQLMutation())")
  public Object requirePermission(ProceedingJoinPoint joinPoint) throws Throwable {
    Object sessionToken = request.getSession().getAttribute("token");
    String headerToken = request.getHeader("token");
    if (sessionToken == null || !sessionToken.equals(headerToken)) {
      throw new GraphQLException("Not Authorized");
    }
    return joinPoint.proceed();
  }
}
