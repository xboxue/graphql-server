import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../../entity/User';
import { sendEmail } from '../utils/sendEmail';
import { createToken } from '../utils/createToken';

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(returns => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<boolean> {
    const user = await User.findOne({ email });

    if (user) {
      const token = await createToken(user.id);
      sendEmail(email, `http://localhost:3000/user/forgot/${token}`);
      return true;
    }
    return false;
  }
}
