import { randomUUID } from 'node:crypto';
import { Field, ObjectType } from '@nestjs/graphql';
import { Author } from '../entity/author.entity.js';

@ObjectType()
export class Login {
  @Field(() => Author, { name: 'account', nullable: true })
  user: Author;

  @Field(() => String, { nullable: true, description: 'Pass this back with all subsequent requests' })
  token: string = randomUUID();

  constructor(user: Author) {
    this.user = user;
  }
}
