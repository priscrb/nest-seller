import { UseGuards } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from './auth/authorization.guard';

@Resolver()
export class TestResolver {
  @Query(() => String)
  // @UseGuards(AuthorizationGuard)
  hello() {
    return 'Hello World!';
  }
}