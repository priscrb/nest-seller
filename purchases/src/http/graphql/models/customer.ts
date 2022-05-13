import { Field, ObjectType } from '@nestjs/graphql';
import { Purchase } from './purchase';

@ObjectType()
export class Customer {
  @Field()
  id: string;

  @Field(() => [Purchase])
  purchases: Purchase[];
}
