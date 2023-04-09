import {createRealmContext} from '@realm/react';
import {CategoryModal} from '../schema/categorySchema';
import {Item} from '../schema/Item';
import {ItemInstance, Order} from '../schema/orderSchema';
import {Table} from '../schema/tableSchema';
import {User} from '../schema/userSchema';

export const realmContext = createRealmContext({
  schema: [Table, CategoryModal, Item, ItemInstance, Order, User],
});
