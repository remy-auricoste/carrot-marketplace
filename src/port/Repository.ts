export interface Aggregate {
  id: string;
}

export interface Repository<A extends Aggregate> {
  getById(id: A['id']): Promise<A>;
  getByIds(ids: ReadonlyArray<A['id']>): Promise<Array<A>>;
  findById(id: A['id']): Promise<A | null>;
  store<B extends A>(aggregate: B): Promise<B>;
  storeAll<B extends A>(aggregates: Array<B>): Promise<Array<B>>;
  delete(id: A['id']): Promise<void>;
  deleteAll(ids: Array<A['id']>): Promise<void>;
}
