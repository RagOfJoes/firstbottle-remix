import type { DataFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import type { ThrownResponse } from '@remix-run/react';
import { z } from 'zod';

import products from '@/data/products.json';
import { paginateProducts } from '@/lib/paginate';
import type { ProductVariantWineModel } from '@/models/base';
import { ProductConnectionSchema, ProductWineSchema } from '@/models/base';

export type InvalidWineID = ThrownResponse<404, string>;

export const loader = async (args: DataFunctionArgs) => {
  const { params } = args;

  const sku = z.string().min(1).safeParse(params.sku);
  if (!sku.success) {
    throw json('Invalid sku provided', { status: 404 });
  }

  const allProducts = z.array(ProductWineSchema).parse(products);

  let variant: ProductVariantWineModel | undefined;
  const wine = allProducts.find((product) => {
    const found = product.variants.find((v) => v.sku === sku.data);
    if (!found) {
      return false;
    }

    variant = found;
    return found;
  });
  if (!variant || !wine) {
    throw json("Oops! Seems that product doesn't exist", { status: 404 });
  }

  const similar = allProducts.filter((product) => {
    if (product.id === wine.id) {
      return false;
    }
    if (product.attributes.varietal !== wine.attributes.varietal) {
      return false;
    }
    if (!product.variants.find((v) => v.price > variant!.price + 20)) {
      return false;
    }

    return true;
  });

  return json({
    wine,
    similar: ProductConnectionSchema.parse(
      paginateProducts(similar, { limit: 10 })
    ),
  });
};
