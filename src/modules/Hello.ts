import { Resolver, Query } from 'type-graphql';

@Resolver()
export class HelloResolver {
  @Query(returns => String)
  async hello(): Promise<string> {
    return 'Hello World!';
  }
}
