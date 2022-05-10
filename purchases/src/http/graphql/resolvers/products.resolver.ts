import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { ProductsService } from '../../../services/product.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CreateProductInput } from '../inputs/create-product-input';
import { Product } from '../models/product';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  /**
   * Product[] - if it was ts
   * [Product] - because it is graphql
   */
  @Query(() => [Product])
  products() {
    return this.productsService.listAllProducts();
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Product)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.createProduct(data);
  }
}
