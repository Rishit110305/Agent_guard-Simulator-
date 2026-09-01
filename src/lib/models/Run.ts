import mongoose, { Schema } from "mongoose";
import { RunState } from "../types";

const LogLineSchema = new Schema(
  {
    t: Number,
    text: String,
    level: { type: String, enum: ["info", "warn", "error", "success"] },
  },
  { _id: false }
);

// PersonaResult / Persona / RootCause / ScoreSet are stored as-is via Mixed —
// they're internal pipeline data, not user input, so schema-less storage here
// trades a bit of query-ability for not having to hand-maintain three nested
// schemas in lockstep with lib/types.ts during a 9-day build.
const RunSchema = new Schema(
  {
    _id: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Number, required: true },
    log: { type: [LogLineSchema], default: [] },
    results: { type: [Schema.Types.Mixed], default: [] },
    rerunResults: { type: [Schema.Types.Mixed], default: [] },
    rootCause: { type: Schema.Types.Mixed },
    patchApplied: { type: String },
    scoresBefore: { type: Schema.Types.Mixed },
    scoresAfter: { type: Schema.Types.Mixed },
    totalPersonas: { type: Number, required: true },
    agentVersionBefore: { type: Schema.Types.Mixed },
    agentVersionAfter: { type: Schema.Types.Mixed },
    customPatch: { type: String },
  },
  { versionKey: false }
);

export type RunStateDoc = Omit<RunState, "id"> & { _id: string };

export const RunModel = mongoose.models.Run ?? mongoose.model("Run", RunSchema);
