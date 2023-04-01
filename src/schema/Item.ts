import {BSON} from 'realm';
import {CategoryModal} from './categorySchema';

export class Item extends Realm.Object<Item> {
  _id!: BSON.ObjectId;
  name!: string;
  price!: Number;
  takeAwayPrice!: Number;
  userId!: string;
  category!: Realm.Results<CategoryModal>;

  static schema: Realm.ObjectSchema = {
    name: 'Item',
    primaryKey: '_id',

    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      name: 'string',
      price: 'int',
      takeAwayPrice: 'int',
      userId: 'string',
      category: {
        type: 'linkingObjects',
        objectType: 'Category',
        property: 'items',
      },
    },
  };
}
