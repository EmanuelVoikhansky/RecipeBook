import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GraphQLLong } from '../graphql/long.scalar.js';
import { Author } from './author.entity.js';
import type { RecipeDraftInput } from './recipe-draft.input.js';

@ObjectType()
@Entity()
export class Recipe {
  @Field(() => GraphQLLong, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  name: string | null;

  @Field(() => Float, { description: 'Overall average rating out of 5 stars' })
  @Column({ type: 'float', default: 0 })
  stars: number;

  @Field(() => String, { nullable: true, description: 'Cover image for this recipe' })
  @Column({ type: 'varchar', nullable: true })
  imageUrl: string | null;

  @Field(() => String, { nullable: true, description: 'How to cook this recipe' })
  @Column({ type: 'text', nullable: true })
  instructions: string | null;

  // Many recipes per author. The Java version mapped this as @OneToOne on a column named
  // recipe_id, which only worked because Hibernate 5 did not enforce uniqueness.
  @Field(() => Author, { nullable: true, description: 'Who wrote this recipe' })
  @ManyToOne(() => Author, { eager: true, nullable: false })
  @JoinColumn({ name: 'author_id' })
  author: Author;

  static create(author: Author, name: string, instructions: string): Recipe {
    return Object.assign(new Recipe(), { author, name, instructions, stars: 0, imageUrl: null });
  }

  /**
   * Mirrors the Java `new Recipe(RecipeDraft)` constructor: every save replaces all draft
   * fields. Omitted fields fall back to the Java defaults (null, and "" for instructions)
   * rather than being left untouched, so updates keep their full-replace behaviour.
   */
  static fromDraft(draft: RecipeDraftInput): Recipe {
    return Object.assign(new Recipe(), {
      name: draft.name ?? null,
      stars: draft.stars,
      imageUrl: draft.imageUrl ?? null,
      instructions: draft.instructions === undefined ? '' : draft.instructions,
    });
  }
}
