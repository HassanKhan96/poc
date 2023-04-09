import {BSON} from 'realm';
import {Item} from './Item';
import {Table} from './tableSchema';

export class ItemInstance extends Realm.Object<ItemInstance> {
  item!: Item;
  quantity!: Number;

  static schema: Realm.ObjectSchema = {
    name: 'ItemInstance',
    embedded: true,
    properties: {
      item: 'Item',
      quantity: 'int',
    },
  };
}

export class Order extends Realm.Object<Order> {
  _id!: BSON.ObjectId;
  cover?: Number;
  tableId!: string;
  userId!: string;
  billAmount!: Number;
  amountReceived!: Number;
  discount!: Number;
  amountPayable!: Number;
  items!: Realm.List<ItemInstance>;
  status!: string;
  isConfirmed!: boolean;
  createdAt!: Date;
  table!: Realm.Results<Table>;

  static schema: Realm.ObjectSchema = {
    name: 'Orders',
    primaryKey: '_id',

    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      cover: 'int?',
      userId: 'string',
      tableId: 'string',
      billAmount: {type: 'int', default: () => 0},
      discount: {type: 'int', default: () => 0},
      amountReceived: {type: 'int', default: () => 0},
      createdAt: {type: 'date?', default: () => new Date()},
      amountPayable: {type: 'int', default: () => 0},
      status: {type: 'string', default: () => 'open'},
      isConfirmed: {type: 'bool', default: () => false},
      table: {type: 'linkingObjects', objectType: 'Table', property: 'orders'},
      items: {
        type: 'list',
        objectType: 'ItemInstance',

        default: () => [],
      },
    },
  };
}
