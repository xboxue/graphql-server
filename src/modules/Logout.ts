import { Resolver, Mutation, Ctx } from 'type-graphql';
import { Context } from '../types/Context';

@Resolver()
export class LogoutResolver {
  @Mutation(returns => Boolean)
  logout(@Ctx() { req }: Context): Promise<boolean> {
    return new Promise((resolve, reject) =>
      req.session!.destroy(err => {
        if (err) {
          console.log(err);
          reject(false);
        }
        resolve(true);
      })
    );
  }
}
