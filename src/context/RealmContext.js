import {createRealmContext} from '@realm/react';
import {CategoryModal} from '../schema/categorySchema';
import {Item} from '../schema/Item';
import {ItemInstance, Order} from '../schema/orderSchema';
import {Table} from '../schema/tableSchema';

export const realmContext = createRealmContext({
  schema: [Table, CategoryModal, Item, ItemInstance, Order],
});
