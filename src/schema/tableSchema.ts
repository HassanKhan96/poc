import {BSON} from 'realm';

export class Table extends Realm.Object<Table> {
  _id!: BSON.ObjectId;
  title!: string;
  userId!: string;

  static schema: Realm.ObjectSchema = {
    name: 'Table',
    primaryKey: '_id',

    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      title: 'string',
      userId: 'string',
    },
  };
}
