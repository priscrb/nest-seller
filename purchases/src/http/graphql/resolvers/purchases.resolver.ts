import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { CustomersService } from '../../../services/customers.service';
import { ProductsService } from '../../../services/product.service';
import { PurchaseService } from '../../../services/purchase.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchaseService: PurchaseService,
    private productsService: ProductsService,
    private customersService: CustomersService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => [Purchase])
  purchases() {
    return this.purchaseService.listAllPurchases();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.productId);
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Purchase)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser, // getting the user from the auth0
  ) {
    // console.log(user.sub);

    /**
     * Getting the user id from the auth0
     */
    let customer = await this.customersService.getCustomerByAuthUserId(
      user.sub,
    );

    // create a customer if not found
    if (!customer) {
      customer = await this.customersService.createCustomer({
        authUserId: user.sub,
      });
    }

    return this.purchaseService.createPurchase({
      customerId: customer.id,
      productId: data.productId,
    });
  }
}
