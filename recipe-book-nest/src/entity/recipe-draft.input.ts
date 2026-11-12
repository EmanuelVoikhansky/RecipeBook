import { Field, Float, InputType } from '@nestjs/graphql';

/** Client-editable recipe fields; named RecipeDraftInput to match the SPQR-generated schema. */
@InputType('RecipeDraftInput')
export class RecipeDraftInput {
  @Field(() => String, { nullable: true })
  name?: string | null;

  @Field(() => Float, { description: 'Overall average rating out of 5 stars' })
  stars: number;

  @Field(() => String, { nullable: true, description: 'Cover image for this recipe' })
  imageUrl?: string | null;

  @Field(() => String, { nullable: true, description: 'How to cook this recipe' })
  instructions?: string | null;
}
