import { Field, InputType } from 'type-graphql';
import { User } from '../../entity/User';
import { PasswordInput } from '../shared/PasswordInput';

@InputType()
export class ResetPasswordInput extends PasswordInput implements Partial<User> {
  @Field()
  token: string;
}
