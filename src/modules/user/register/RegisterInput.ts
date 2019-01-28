import { Field, InputType } from 'type-graphql';
import { User } from '../../../entity/User';
import { Length, IsEmail } from 'class-validator';
import { IsEmailAlreadyExist } from './IsEmailAlreadyExist';
import { PasswordInput } from '../../shared/PasswordInput';

@InputType()
export class RegisterInput extends PasswordInput implements Partial<User> {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'Email already exists' })
  email: string;
}
