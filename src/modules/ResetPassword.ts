import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { redis } from './Redis';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';
import { ResetPasswordInput } from './resetPassword/ResetPasswordInput';
import { Context } from '../types/Context';

@Resolver()
export class ResetPasswordResolver {
  @Mutation(returns => User, { nullable: true })
  async resetPassword(
    @Arg('data')
    { token, password }: ResetPasswordInput,
    @Ctx() { req }: Context
  ): Promise<User | null> {
    const userId = await redis.get(token);

    if (userId) {
      const hash = await bcrypt.hash(password, 12);

      const user = await User.findOne(userId);
      if (user) {
        user.password = hash;
        user.save();

        redis.del(token);
        req.session!.sessionId = user.id;

        return user;
      }
    }
    return null;
  }
}
