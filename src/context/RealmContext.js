import {createRealmContext} from '@realm/react';
import {CategoryModal} from '../schema/categorySchema';
import {Item} from '../schema/Item';
import {Table} from '../schema/tableSchema';

export const realmContext = createRealmContext({
  schema: [Table, CategoryModal, Item],
});
