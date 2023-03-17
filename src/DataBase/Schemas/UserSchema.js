import { Schema, SchemaTypes, model } from 'mongoose';

const User = new Schema({
  guildId: {
    type: SchemaTypes.String,
    required: true
  },
  userId: {
    type: SchemaTypes.String,
    required: true
  }
});

export default model('User', User);
