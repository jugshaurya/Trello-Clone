const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const attachBoardsHooks = require("../hooks/boards.hooks");
const boardSchema = new Schema(
  {
    boardName: {
      type: String,
      required: true
    },
    boardBackground: {
      type: String,
      required: true
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    memberIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    ]
  },
  {
    timestamps: true
  }
);

attachBoardsHooks(boardSchema);

const Board = mongoose.model("boards", boardSchema);

module.exports = Board;