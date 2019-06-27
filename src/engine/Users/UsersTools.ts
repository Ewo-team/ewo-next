import { IStateServer } from '@engine/reducers';
import { User } from '@models';
import { Store } from 'redux';

export class UsersTools {
  public static hydrater = (source: any): User => {
    return {
      id: source.id !== undefined ? source.id : null,
      name: source.name !== undefined ? source.name : null,
      hash: source.hash !== undefined ? source.hash : null,
      email: source.email !== undefined ? source.email : null,
    };
  }

  // tslint:disable-next-line: no-identical-functions
  public static serializer = (source: User): any => {
    const userJson: any = {};

    if (source.id !== null) {
      userJson.id = source.id;
    }

    if (source.name !== null) {
      userJson.name = source.name;
    }

    if (source.hash !== null) {
      userJson.hash = source.hash;
    }

    if (source.email !== null) {
      userJson.email = source.email;
    }

    return userJson;
  }

  public static ownedChar = (store: Store<IStateServer>, user: User): number[] => {
    const characters = store.getState().Characters.filter(c => c.owner === user.id);

    return characters.toList().map(c => c.mat).toArray();
  }
}
