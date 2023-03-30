import {BSON} from 'realm';

export class CategoryModal extends Realm.Object<CategoryModal> {
  _id!: BSON.ObjectId;
  name!: string;
  userId!: string;
  createdAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'Category',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      name: {type: 'string', indexed: true},
      userId: 'string',
      createdAt: {type: 'date?', default: () => Date.now()},
    },
  };
}
