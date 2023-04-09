import {BSON} from 'realm';
import {Order} from './orderSchema';

export class Table extends Realm.Object<Table> {
  _id!: BSON.ObjectId;
  title!: string;
  userId!: string;
  orders?: Realm.List<Order>;

  static schema: Realm.ObjectSchema = {
    name: 'Table',
    primaryKey: '_id',

    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      title: 'string',
      userId: 'string',
      orders: {type: 'Orders[]', default: () => []},
    },
  };
}
