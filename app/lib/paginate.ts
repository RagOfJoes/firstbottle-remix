import dayjs from 'dayjs';

import type {
  PageInfoModel,
  ProductConnectionModel,
  ProductEdgeModel,
  ProductWineModel,
} from '@/models/base';

/**
 * Helper functions that mock an API response for paginated endpoints
 *
 */

// Decode cursor into string value
export const decodeCursor = (str: string) => {
  const decoded = Buffer.from(str, 'base64').toString('ascii');

  return decoded.replace('Cursor:', '');
};

const getSort = (
  str: string
): [sortKey: keyof ProductWineModel, sortOrder: 'asc' | 'desc'] => {
  const split = str.split('-');
  if (!split || split.length !== 2) {
    throw new Error('Invalid sort provided');
  }

  const [sortKey, sortOrder] = split;
  if (!sortKey || !sortOrder) {
    throw new Error('Invalid sort provided');
  }

  if (!['createdAt'].includes(sortKey)) {
    throw new Error('Invalid sort key provided');
  }
  if (sortOrder.toLowerCase() !== 'asc' && sortOrder.toLowerCase() !== 'desc') {
    throw new Error('Invalid sort order provided');
  }

  return [sortKey as keyof ProductWineModel, sortOrder as 'asc' | 'desc'];
};

export const paginateProducts = (
  products: ProductWineModel[],
  opts: { cursor?: string; limit?: number; sort?: string }
): ProductConnectionModel => {
  const { cursor = '', limit = 10, sort = 'createdAt-desc' } = opts;

  const [sortKey, sortOrder] = getSort(sort);

  const filtered = products
    .filter((p) => {
      if (!cursor || cursor.length === 0) {
        return true;
      }

      return sortOrder === 'asc'
        ? dayjs(p[sortKey] as string).isAfter(dayjs(decodeCursor(cursor)))
        : dayjs(p[sortKey] as string).isBefore(dayjs(decodeCursor(cursor)));
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return dayjs(b.createdAt).isBefore(dayjs(a.createdAt)) ? 1 : -1;
      }

      return dayjs(b.createdAt).isAfter(dayjs(a.createdAt)) ? 1 : -1;
    })
    .slice(0, limit + 1);

  const edges: ProductEdgeModel[] = filtered.map((product) => ({
    cursor: Buffer.from(`Cursor:${product[sortKey] as string}`).toString(
      'base64'
    ),
    node: product,
  }));

  const hasNextPage = edges.length > limit;
  const pageInfo: PageInfoModel = {
    cursor: hasNextPage ? edges[edges.length - 1]!.cursor : '',
    hasNextPage,
  };

  return {
    edges: edges.slice(0, edges.length - 1),
    pageInfo,
  };
};
