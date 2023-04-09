import {BSON} from 'realm';

export class User extends Realm.Object<User> {
  _id!: BSON.ObjectId;
  managerPin?: string;
  createdAt?: Date;

  static schema: Realm.ObjectSchema = {
    name: 'Users',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId'},
      managerPin: {type: 'string?', default: () => ''},
      createdAt: {type: 'date?', default: () => new Date()},
    },
  };
}
