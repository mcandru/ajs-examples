import mongoose from "mongoose";

export interface SerialisedNote {
  id: string;
  content: string;
  important: boolean;
  user: mongoose.Types.ObjectId;
}

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      minlength: 5,
      required: true,
    },
    important: Boolean,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

noteSchema.set("toJSON", {
  transform: (_document, returnedObject): SerialisedNote => {
    return {
      id: returnedObject._id.toString(),
      content: returnedObject.content,
      important: returnedObject.important || false,
      user: returnedObject.user,
    };
  },
});

type NoteType = mongoose.InferSchemaType<typeof noteSchema>;

export const Note = mongoose.model<NoteType>("Note", noteSchema);
