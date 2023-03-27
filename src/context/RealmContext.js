import {createRealmContext} from '@realm/react';
import {Table} from '../schema/tableSchema';

export const realmContext = createRealmContext({
  schema: [Table],
});
