import {BSON} from 'realm';
import {Item} from './Item';

export class CategoryModal extends Realm.Object<CategoryModal> {
  _id!: BSON.ObjectId;
  name!: string;
  userId!: string;
  createdAt!: Date;
  items!: Realm.List<Item>;

  static schema: Realm.ObjectSchema = {
    name: 'Category',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      name: {type: 'string', indexed: true},
      userId: 'string',
      items: 'Item[]',
      createdAt: {type: 'date?', default: () => new Date()},
    },
  };
}
