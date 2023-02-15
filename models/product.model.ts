import mongoose, { Schema, Model, Document } from 'mongoose';

type ProductDocument = Document & {
  name: string;
  description: string;
  quantity: number;
  
};

type ProductInput = {
  name: ProductDocument['name'];
  description: ProductDocument['description'];
  quantity: ProductDocument['quantity'];
  user: object,
  category: object
};

const productSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    quantity: {
      type: Schema.Types.Number,
      required: true,
    },

    images: {
        type: Schema.Types.Array,
        required: false
    },

    softDeleted: {
      type: Schema.Types.Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        index: true,
      },
  },
  {
    collection: 'products',
    timestamps: true,
  },
);

const Product: Model<ProductDocument> = mongoose.model<ProductDocument>('Product', productSchema);

export { Product, ProductInput, ProductDocument };