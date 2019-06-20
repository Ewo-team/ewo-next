import { User } from '@models';

export namespace UsersTools {
  export const hydrater = (source: any): User => {
    return {
      id: source.id,
      name: source.name,
      hash: source.hash,
      email: source.email,
    };
  };

  export const serializer = (source: User): any => {
    return {
      id: source.id,
      name: source.name,
      hash: source.hash,
      email: source.email,
    };
  };
}
