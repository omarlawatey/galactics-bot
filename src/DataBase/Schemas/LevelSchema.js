import { Schema, SchemaTypes, model } from 'mongoose';

const Level = new Schema({
  guildId: {
    type: SchemaTypes.String,
    required: true
  },
  userId: {
    type: SchemaTypes.String,
    required: true
  },
  xp: {
    type: SchemaTypes.Number,
    required: true
  },
  level: {
    type: SchemaTypes.Number,
    required: true
  }
});

export default model('Level', Level);
