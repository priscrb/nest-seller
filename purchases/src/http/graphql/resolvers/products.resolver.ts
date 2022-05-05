import { UseGuards } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { ProductsService } from '../../../services/product.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Product } from '../models/product';

@Resolver()
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  /**
   * Product[] - if it was ts
   * [Product] - because it is graphql
   */
  @Query(() => [Product])
  // @UseGuards(AuthorizationGuard)
  products() {
    return this.productsService.listAllProducts();
  }
}
