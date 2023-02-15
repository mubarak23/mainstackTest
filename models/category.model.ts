import mongoose, { Schema, Model, Document } from 'mongoose';

type CategoryDocument = Document & {
  name: string;
  description: string;
  user: any
};

type CategoryInput = {
  name: CategoryDocument['name'];
  description: CategoryDocument['description']; 
  user: CategoryDocument['user']
};

const categoriesSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    productCount: {
      type: Schema.Types.Number,
      required: false,
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
  },
  {
    collection: 'categories',
    timestamps: true,
  },
);

const Category: Model<CategoryDocument> = mongoose.model<CategoryDocument>('Category', categoriesSchema);

export { Category, CategoryInput, CategoryDocument };