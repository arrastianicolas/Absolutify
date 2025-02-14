const express = require("express");
const spotifyController = require("../controllers/spotifyController");

const router = express.Router();

router.get("/login", spotifyController.login); // Redirige al login de Spotify
router.get("/absolutify", spotifyController.callback); // Recibe el token después de login
router.get("/playlists", spotifyController.getUserPlaylists); // Obtener playlists
router.get("/search", spotifyController.searchTracks); // Buscar tracks
router.get("/me", spotifyController.meUsers);
router.post("/refresh", spotifyController.refresh);
module.exports = router;
