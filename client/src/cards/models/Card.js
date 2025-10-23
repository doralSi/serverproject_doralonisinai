import mongoose from "mongoose";
const { Schema } = mongoose;

const cardSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: String,
  phone: { type: String, required: true },
  email: { type: String, required: true },
  web: String,
  image: { type: String, required: true },
  alt: String,
  city: { type: String, required: true },
  street: { type: String, required: true },
  houseNumber: { type: String, required: true },
  bizNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Card = mongoose.model("Card", cardSchema);
export default Card;
