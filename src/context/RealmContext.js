import {createRealmContext} from '@realm/react';
import {CategoryModal} from '../schema/categorySchema';
import {Table} from '../schema/tableSchema';

export const realmContext = createRealmContext({
  schema: [Table, CategoryModal],
});
