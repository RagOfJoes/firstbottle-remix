import { json } from '@remix-run/node';
import { z } from 'zod';

import categories from '@/data/categories.json';
import productCategories from '@/data/products-categories.json';
import products from '@/data/products.json';
import { paginateProducts } from '@/lib/paginate';
import type { ProductConnectionModel } from '@/models/base';
import {
  ProductCategorySchema,
  ProductConnectionSchema,
  ProductWineSchema,
} from '@/models/base';

const getProductFromCategories = (
  key: keyof typeof productCategories
): null | ProductConnectionModel => {
  const skus = productCategories[key];
  if (!skus) {
    return null;
  }

  const wines = z
    .array(ProductWineSchema)
    .parse(products)
    .filter((p) => p.variants.filter((v) => skus.includes(v.sku))?.length > 0);

  return paginateProducts(wines, { limit: 20 });
};

export const loader = async () => {
  const allCategories = z.array(ProductCategorySchema).parse(categories);
  const allProducts = z.array(ProductWineSchema).parse(products);

  const featuredCategory = allCategories.find(
    (c) => c.slug === 'todays-featured-bottle'
  );
  if (!featuredCategory) {
    throw json('Failed to fetch featured category', { status: 500 });
  }

  const featuredProductSKUs =
    productCategories[featuredCategory.title as keyof typeof productCategories];
  if (!featuredProductSKUs || featuredProductSKUs.length !== 1) {
    throw json('Failed to fetch featured category products', { status: 500 });
  }

  const featuredProduct = allProducts.find((p) =>
    p.variants.find((v) => v.sku === featuredProductSKUs[0]!)
  );
  if (!featuredProduct) {
    throw json('Failed to fetch featured product', { status: 500 });
  }

  const newArrivals = paginateProducts(allProducts, { limit: 10 });
  if (!newArrivals) {
    throw json('Failed to fetch new arrivals', { status: 500 });
  }

  const samplers = allCategories.filter((category) =>
    ['kick-ass-napa-cabs', 'farmer-fizz', 'kick-the-grill-up-a-notch'].includes(
      category.slug
    )
  );

  return json({
    champagne: ProductConnectionSchema.parse(
      getProductFromCategories('Champagne')
    ),
    featuredProduct: ProductWineSchema.parse(featuredProduct),
    largeFormats: ProductConnectionSchema.parse(
      getProductFromCategories('Large Formats')
    ),
    newArrivals: ProductConnectionSchema.parse(newArrivals),
    newCellar: ProductConnectionSchema.parse(
      getProductFromCategories('New Cellar')
    ),
    organicallyFarmed: ProductConnectionSchema.parse(
      getProductFromCategories('Organically Farmed')
    ),
    rareCollectible: ProductConnectionSchema.parse(
      getProductFromCategories('Rare & Collectable')
    ),
    samplers: z.array(ProductCategorySchema).parse(samplers),
    trendingNow: ProductConnectionSchema.parse(
      getProductFromCategories('Trending Now')
    ),
  });
};
