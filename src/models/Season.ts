import mongoose from "mongoose";

import MovieModel from "./movie";
import EpisodeModel from "./episode";

const schema = new mongoose.Schema({
  seasonNumber: Number,
  episodes: [{ type: mongoose.Types.ObjectId, ref: "Episode", default: [] }],
  series: { type: mongoose.Types.ObjectId, ref: "Movie" },
});

const model = mongoose.models?.Season || mongoose.model("Season", schema);

export default model;
