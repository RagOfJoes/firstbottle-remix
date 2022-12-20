/**
 * Base schemas and models that clients can extend for custom fields
 *
 */

import { z } from 'zod';

/**
 * Helper schemas
 *
 */

/**
 * PageInfo for Connections
 */
export const PageInfoSchema = z.object({
  // Will be a base64 encoded string
  cursor: z.string(),
  hasNextPage: z.boolean().default(false),
});

export type PageInfoModel = z.infer<typeof PageInfoSchema>;

/**
 * SEO fields
 */
export const SEOSchema = z.object({
  title: z.string().nullish(),
  description: z.string().nullish(),
});

export type SEOModel = z.infer<typeof SEOSchema>;

/**
 * Base schema
 *
 */

export const BaseSchema = z.object({
  id: z.string().uuid().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullish(),

  attributes: z.object({}).nullish(),
});

export type BaseModel = z.infer<typeof BaseSchema>;

/**
 * Base Image schema
 *
 */

export const ImageSchema = BaseSchema.extend({
  /**
   * A hint for the clients as to where and when an image should be displayed
   * Examples: 'THUMBNAIL', 'DETAIL', 'CART', etc.
   */
  type: z.string(),
  description: z.string().nullish(),

  attributes: z.object({
    formats: z.object({
      small: z.string().url(),
      medium: z.string().url(),
      large: z.string().url(),
    }),
  }),
});

export type ImageModel = z.infer<typeof ImageSchema>;

/**
 * Base Inventory Location schema
 *
 */

export const InventoryLocationSchema = BaseSchema.extend({
  sku: z.string().min(1),
  upc: z.string().nullish(),
  title: z.string().min(1),
  description: z.string().nullish(),

  address: z.string().min(1),
  address2: z.string().nullish(),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  zip: z.string().min(1),

  phone: z.string().min(1),
});

export type InventoryLocationModel = z.infer<typeof InventoryLocationSchema>;

/**
 * Base Product Inventory schema
 */

export const ProductInventorySchema = BaseSchema.extend({
  productID: z.string().uuid(),
  productVariantID: z.string().uuid(),
  inventoryLocationID: z.string().uuid(),

  stock: z.number(),
});

export type ProductInventoryModel = z.infer<typeof ProductInventorySchema>;

/**
 * Base Product Variant schema
 *
 */

export const ProductVariantSchema = BaseSchema.extend({
  sku: z.string().min(1),
  productID: z.string().uuid(),
  title: z.string().min(1),
  subtitle: z.string().nullish(),
  upc: z.string().nullish(),
  weight: z.number().nullish(),

  taxType: z.enum(['NONE', 'WINE'] as const),
  // NOTE: This is an internal field and will never be passed to the client
  // and this is only visible here to outline all the fields that a product has
  cost: z.number(),
  price: z.number(),
  retailPrice: z.number(),

  maxPurchaseQuantity: z.number(),
  minPurchaseQuantity: z.number(),
  minShippingOffer: z.number().nullish(),

  isComparable: z.boolean().nullish().default(false),
  isDiscountEligible: z.boolean().nullish().default(false),
  isFeatured: z.boolean().nullish().default(false),
  isFreeShipping: z.boolean().nullish().default(false),
  isInInventory: z.boolean().default(false),
  isNew: z.boolean().nullish().default(false),
  isShippingIncluded: z.boolean().nullish().default(false),

  inventories: z.array(ProductInventorySchema).nullish(),
});

export type ProductVariantModel = z.infer<typeof ProductVariantSchema>;

/**
 * Base Product schema
 *
 */

const ProductType = z.enum(['GIFT_CARD', 'WINE'] as const);

export const ProductSchema = BaseSchema.extend({
  type: ProductType,
  title: z.string().min(1),
  subtitle: z.string().nullish(),
  status: z.enum(['ACTIVE', 'INACTIVE'] as const),
  internalStatus: z.enum(['ACTIVE', 'HIDDEN', 'INACTIVE'] as const),

  availableTo: z.enum(['OPEN', 'ALLOCATION', 'CLUB', 'GROUP'] as const),

  description: z.string().nullish(),
  image: z.string().url(),
  images: z.array(ImageSchema),
  summary: z.string().nullish(),
  seo: SEOSchema.nullish(),

  variants: z.array(ProductVariantSchema),
});

export type ProductModel = z.infer<typeof ProductSchema>;

/**
 * Base Gift Card Product schema
 *
 */

// TODO: Expand on this
export const ProductGiftCardSchema = ProductSchema.extend({
  // This allows for discriminatedUnion
  // Ref: https://github.com/colinhacks/zod#discriminated-unions
  type: z.literal('GIFT_CARD'),
});

export type ProductGiftCardModel = z.infer<typeof ProductGiftCardSchema>;

/**
 * Base Wine Product Variant schema
 *
 */

export const ProductVariantWineSchema = ProductVariantSchema.extend({
  attributes: z.object({
    bottleCount: z.number(),
    bottleSize: z.string().min(1),
    bottleSizeDisplay: z.string().min(1),
  }),
});

export type ProductVariantWineModel = z.infer<typeof ProductVariantWineSchema>;

/**
 * Base Wine Product schema
 *
 */

export const ProductWineSchema = ProductSchema.extend({
  // This allows for discriminatedUnion
  // Ref: https://github.com/colinhacks/zod#discriminated-unions
  type: z.literal('WINE'),
  variants: z.array(ProductVariantWineSchema),

  attributes: z.object({
    // Technical details
    //

    aging: z.string().nullish(),
    alcohol: z.string().nullish(),
    appellation: z.string().nullish(),
    blend: z.string().nullish(),
    bottleDate: z.string().nullish(),
    brixAtHarvest: z.string().nullish(),
    caseProduction: z.string().nullish(),
    country: z.string().nullish(),
    elevage: z.string().nullish(),
    farmingMethod: z.string().nullish(),
    fermentation: z.string().nullish(),
    harvestDate: z.string().nullish(),
    oak: z.string().nullish(),
    ph: z.string().nullish(),
    producer: z.string().nullish(),
    region: z.string().nullish(),
    releaseDate: z.string().nullish(),
    residualSugar: z.string().nullish(),
    score: z.string().nullish(),
    soil: z.string().nullish(),
    stainless: z.string().nullish(),
    subRegion: z.string().nullish(),
    ta: z.string().nullish(),
    upc: z.string().nullish(),
    varietal: z.string().nullish(),
    vineyard: z.string().nullish(),
    vintage: z.string().nullish(),
    wineType: z.string().nullish(),
    winemaker: z.string().nullish(),
  }),
});

export type ProductWineModel = z.infer<typeof ProductWineSchema>;

/**
 * Base Product Category schema
 *
 */

export const ProductCategorySchema = BaseSchema.extend({
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().nullish(),
  status: z.enum(['ACTIVE', 'INACTIVE'] as const),
  internalStatus: z.enum(['ACTIVE', 'HIDDEN', 'INACTIVE'] as const),

  description: z.string().nullish(),
  image: z.string().url().nullish().or(z.literal('')),
  images: z.array(ImageSchema),
  summary: z.string().nullish(),
  seo: SEOSchema.nullish(),
});

export type ProductCategoryModel = z.infer<typeof ProductCategorySchema>;

/**
 * Base Product Edge schema
 */

export const ProductEdgeSchema = z.object({
  cursor: z
    .string()
    .min(1)
    .refine((str) => Buffer.from(str, 'base64').toString('base64') === str),
  node: z.discriminatedUnion('type', [
    ProductGiftCardSchema,
    ProductWineSchema,
  ]),
});

export type ProductEdgeModel = z.infer<typeof ProductEdgeSchema>;

/**
 * Base Product Connection schema
 */

export const ProductConnectionSchema = z.object({
  edges: z.array(ProductEdgeSchema),
  pageInfo: PageInfoSchema,
});

export type ProductConnectionModel = z.infer<typeof ProductConnectionSchema>;
