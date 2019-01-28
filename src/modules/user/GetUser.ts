import { Resolver, Ctx, Query } from 'type-graphql';
import { User } from '../../entity/User';
import { Context } from '../../types/Context';

@Resolver()
export class UserResolver {
  @Query(returns => User, { nullable: true })
  async getUser(@Ctx() { req }: Context): Promise<User | undefined> {
    if (req.session!.userId) {
      return User.findOne(req.session!.userId);
    }
    return undefined;
  }
}
