import { User } from '@models';

export class UsersTools {
  public static hydrater = (source: any): User => {
    return {
      id: source.id,
      name: source.name,
      hash: source.hash,
      email: source.email,
    };
  }

  public static serializer = (source: User): any => {
    return {
      id: source.id,
      name: source.name,
      hash: source.hash,
      email: source.email,
    };
  }
}
