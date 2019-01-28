import { InputType, Field } from 'type-graphql';
import { User } from '../../entity/User';
import { MinLength } from 'class-validator';

@InputType()
export class PasswordInput implements Partial<User> {
  @Field()
  @MinLength(8)
  password: string;
}
