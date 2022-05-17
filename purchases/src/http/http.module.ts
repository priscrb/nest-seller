import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';

import path from 'node:path';
import { ApolloDriver } from '@nestjs/apollo';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { ProductsService } from '../services/product.service';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { PurchaseService } from '../services/purchase.service';
import { CustomersService } from '../services/customers.service';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';
import { MessagingModule } from '../messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MessagingModule, // kafka module
    GraphQLModule.forRoot({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
  ],
  providers: [
    ProductsResolver,
    ProductsService,

    PurchasesResolver,
    PurchaseService,

    CustomersService,
    CustomersResolver,
  ],
})
export class HttpModule {}
