import { Schema, SchemaTypes, model } from 'mongoose';

const Guild = new Schema({
  guildId: {
    type: SchemaTypes.String,
    required: true
  }
});

export default model('Guild', Guild);
