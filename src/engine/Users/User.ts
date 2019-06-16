export interface User {
  id: number;
  name: string;
  hash: string;
  email: string;
  token?: string; // Token for socket.io
}

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
