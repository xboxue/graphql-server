import uuidv4 from 'uuid/v4';
import { redis } from '../Redis';

export async function createToken(userId: number) {
  const token = uuidv4();
  redis.set(token, userId, 'ex', 60 * 60 * 24);
  return token;
}
