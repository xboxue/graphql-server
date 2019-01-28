import { Resolver, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcrypt';
import { User } from '../../entity/User';
import { RegisterInput } from './register/RegisterInput';
import { sendEmail } from '../utils/sendEmail';
import { createToken } from '../utils/createToken';

@Resolver()
export class RegisterResolver {
  @Mutation(returns => User)
  async register(@Arg('data')
  {
    firstName,
    lastName,
    email,
    password
  }: RegisterInput): Promise<User> {
    const hash = await bcrypt.hash(password, 12);

    const user = User.create({
      firstName,
      lastName,
      email,
      password: hash
    });

    await user.save();

    const token = await createToken(user.id);
    sendEmail(user.email, `http://localhost:3000/user/verify/${token}`);

    return user;
  }
}
