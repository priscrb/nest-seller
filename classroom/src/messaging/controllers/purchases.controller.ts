import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

export interface Customer {
  authUserId: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
}

export interface PurchaseCreatedPayload {
  customer: Customer;
  product: Product;
}

/**
 * controller to receive message from kafka
 */

@Controller()
export class PurchaseController {
  // this topic will be called every time a new message is sent to kafka
  @EventPattern('purchases.new-purchase')
  async purchaseCreated(
    @Payload('value') payload: PurchaseCreatedPayload, // will get only the payload body, not other info
  ) {
    console.log(payload);
  }
}
