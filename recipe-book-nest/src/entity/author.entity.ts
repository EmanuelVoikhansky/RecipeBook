import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GraphQLLong } from '../graphql/long.scalar.js';

@ObjectType()
@Entity({ name: 'Authors' })
export class Author {
  @Field(() => GraphQLLong, { nullable: true, description: 'Auto generated on creation, do not set' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  name: string | null;

  @Field(() => String, { name: 'profilePicUrl', nullable: true, description: 'URL of the authors profile pic' })
  @Column({ type: 'varchar', nullable: true })
  imageUrl: string | null;

  // No @Field: kept out of the GraphQL schema, as @GraphQLIgnore did in the Java version.
  @Column({ type: 'varchar', unique: true })
  email: string;

  // Plain text to match recipe-book-java. In a real app this must be a salted hash.
  @Column({ type: 'varchar' })
  password: string;

  static create(email: string, password: string, name: string | null = null): Author {
    return Object.assign(new Author(), { email, password, name, imageUrl: null });
  }

  isValidLogin(passwordAttempt: string): boolean {
    return this.password === passwordAttempt;
  }
}
