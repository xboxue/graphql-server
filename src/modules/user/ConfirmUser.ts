import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../../entity/User';
import { redis } from '../Redis';

@Resolver()
export class ConfirmUserResolver {
  @Mutation(returns => Boolean)
  async confirmUser(@Arg('token') token: string): Promise<boolean> {
    const userId = await redis.get(token);

    if (userId) {
      const user = await User.findOne(userId);

      if (user) {
        user.confirmed = true;
        user.save();
        redis.del(token);
        return true;
      }
    }
    return false;
  }
}
