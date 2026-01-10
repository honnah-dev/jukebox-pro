import express from "express";
const router = express.Router();
export default router;

import { getTracks, getTrackById } from "#db/queries/tracks";
import requireUser from "#middleware/requireUser";
import { getPlaylistsByTrackId } from "#db/queries/playlists";

router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.param("id", async (req, res, next, id) => {
  const track = await getTrackById(id);

  if (!track) return res.status(404).send("Track is not found.");

  req.track = track;
  next();
});



router.get("/:id", async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.status(404).send("Track not found.");
  res.send(track);
});


router.get("/:id/playlists", requireUser, async (req, res) => {
  const playlists = await getPlaylistsByTrackId(req.track.id);
  res.send(playlists);
});