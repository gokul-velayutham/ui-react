import { get } from 'lodash';
import columnDefs from '../../column-defs';

const getColumnDefs = (path) => {
  if (path instanceof Array) return path.map((data) => get(columnDefs, data));
  return get(columnDefs, path);
};

export default getColumnDefs;
