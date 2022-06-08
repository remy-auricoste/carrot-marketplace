import { Aggregate, Repository } from '../../port/Repository';
import { Predicate } from './Predicate';

export abstract class InMemoryRepository<A extends Aggregate>
  implements Repository<A>
{
  constructor(
    public aggregates: A[] = [],
    public readonly aggregateName: string,
  ) {}

  protected findOneBy = async (predicate: Predicate<A>): Promise<A | null> =>
    this.aggregates.find(predicate) ?? null;

  protected getOneBy = async (
    predicate: Predicate<A>,
    errorMessage: string,
  ): Promise<A> => {
    const found = await this.findOneBy(predicate);
    if (found === null) {
      throw new Error(errorMessage);
    }
    return found;
  };

  protected getAllBy = async (predicate: Predicate<A>): Promise<Array<A>> =>
    this.aggregates.filter(predicate);

  getById = async (id: A['id']): Promise<A> =>
    this.getOneBy(
      aggregate => aggregate.id === id,
      `Aggregate ${this.aggregateName} not found with id ${id}`,
    );

  getByIds = async (ids: Array<A['id']>): Promise<Array<A>> =>
    this.getAllBy(aggregate => ids.includes(aggregate.id));

  findById = async (id: A['id']): Promise<A | null> =>
    this.findOneBy(aggregate => aggregate.id === id);

  store = async <B extends A>(aggregate: B): Promise<B> => {
    this.aggregates.push(aggregate);
    return aggregate;
  };
  storeAll = async <B extends A>(aggregates: Array<B>): Promise<Array<B>> => {
    this.aggregates = this.aggregates.concat(aggregates);
    return aggregates;
  };

  delete = async (id: A['id']): Promise<void> => this.deleteAll([id]);

  deleteAll = async (ids: Array<A['id']>): Promise<void> => {
    this.aggregates = this.aggregates.filter(
      aggregate => !ids.includes(aggregate.id),
    );
    return;
  };
}
