import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Product } from './product';

enum PurchaseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED',
}

registerEnumType(PurchaseStatus, {
  name: 'PurchaseStatus',
  description: 'The status of the purchase',
});

/**
 * Here we could put more relevant info for the frontend, we dont neet to descript every single thing, like the updatedAt
 */

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string;

  @Field(() => PurchaseStatus)
  status: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Product)
  product: Product;

  /**
   * No field so the frontend cannot search by this
   */
  productId: string;
}
