/* eslint-disable no-param-reassign */
/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v, createdAt, updatedAt, and any path that has private: true
 *  - replaces _id with id
 */

const toJSON = (schema: any) => {
  if (!schema.options.toObject) {
    schema.options.toObject = {};
  }

  schema.options.toObject.transform = function (doc: any, ret: any) {
    // Set the id from the return object value which will be a string.
    // ret is return obj
    ret.id = ret._id;

    delete ret._id;
    delete ret.__v;
  };
};

export default toJSON;
