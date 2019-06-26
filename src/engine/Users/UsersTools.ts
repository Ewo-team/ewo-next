import { IStateServer } from '@engine/reducers';
import { User } from '@models';
import { Store } from 'redux';

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

  public static ownedChar = (store: Store<IStateServer>, user: User): number[] => {
    const characters = store.getState().Characters.filter(c => c.owner === user.id);

    return characters.toList().map(c => c.mat).toArray();
  }
}
