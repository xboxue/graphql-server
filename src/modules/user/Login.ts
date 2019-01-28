import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import bcrypt from 'bcrypt';
import { User } from '../../entity/User';
import { Context } from '../../types/Context';

@Resolver()
export class LoginResolver {
  @Mutation(returns => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { req }: Context
  ): Promise<User | null> {
    const user = await User.findOne({ email });

    if (user) {
      const valid = await bcrypt.compare(password, user.password);

      if (valid && user.confirmed) {
        req.session!.userId = user.id;
        return user;
      }
    }
    return null;
  }
}
