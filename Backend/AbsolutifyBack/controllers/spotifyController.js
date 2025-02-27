const axios = require("axios");
const qs = require("qs");
const dotenv = require("dotenv");

dotenv.config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

exports.login = (req, res) => {
  const scopes =
    "user-read-private user-read-email playlist-read-private user-top-read playlist-modify-public playlist-modify-private";

  const authUrl = `https://accounts.spotify.com/authorize?${qs.stringify({
    response_type: "code",
    client_id: clientId,
    scope: scopes,
    redirect_uri: redirectUri,
  })}`;
  res.redirect(authUrl);
};

exports.callback = async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token } = response.data;

    res.cookie("spotifyAccessToken", access_token, {
      httpOnly: true,
      secure: true, // Cambiar a true en producción
      sameSite: "Strict",
      maxAge: 3600 * 1000, // 1 hora
    });
    res.cookie("spotifyRefreshToken", refresh_token, {
      httpOnly: true,
      secure: true, // Cambiar a true en producción
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
    });

    res.redirect("http://localhost:5173/home");
  } catch (error) {
    res.status(500).json({ error: error.response });
  }
};

exports.refresh = async (req, res) => {
  const refreshToken = req.cookies.spotifyRefreshToken; // Obtener el refresh token desde el body

  if (!refreshToken) {
    return res.status(400).json({ error: "No se proporcionó refresh_token." });
  }

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const newAccessToken = response.data.access_token;
    accessToken = newAccessToken;
    // Guardar el nuevo access token en cookies
    res.cookie("spotifyAccessToken", newAccessToken, {
      httpOnly: false,
      secure: false,
      sameSite: "Strict",
      maxAge: 3600 * 1000, // 1 hora
    });

    res.json({ access_token: newAccessToken });
  } catch (error) {
    console.error(
      "Error al refrescar el token:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ error: error.response?.data || "Error interno del servidor" });
  }
};

exports.getUserPlaylists = async (req, res) => {
  const accessToken = req.cookies.spotifyAccessToken;
  if (!accessToken) {
    return res.status(401).json({ error: "No estás autenticado." });
  }

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data.items);
  } catch (error) {
    res.status(500).json({ error: error.response.data });
  }
};

exports.searchTracks = async (req, res) => {
  const query = req.query.q; // Obtiene el término de búsqueda
  const type = req.query.type; // Obtiene el tipo (track, album, playlist)
  const accessToken = req.cookies.spotifyAccessToken;

  if (!accessToken) {
    return res.status(401).json({ error: "No estás autenticado." });
  }

  if (!query || !type) {
    return res
      .status(400)
      .json({ error: "Debes proporcionar un término de búsqueda y un tipo." });
  }

  try {
    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: query,
        type: type,
        limit: 5,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: error.response?.data || "Error al obtener datos de Spotify",
    });
  }
};
exports.followPlaylist = async (req, res) => {
  const { playlist_id } = req.body;
  const accessToken = req.cookies.spotifyAccessToken;

  if (!accessToken) {
    return res.status(401).json({ error: "No estás autenticado." });
  }

  try {
    await axios.put(
      `https://api.spotify.com/v1/playlists/${playlist_id}/followers`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.status(200).json({ message: "Playlist seguida con éxito" });
  } catch (error) {
    console.error(
      "Error al seguir la playlist",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ error: error.response?.data || "Error interno del servidor" });
  }
};

exports.meUsers = async (req, res) => {
  // Ver las cookies en la consola
  const accessToken = req.cookies.spotifyAccessToken;
  if (!accessToken) {
    return res.status(401).json({ error: "No estás autenticado." });
  }

  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error al obtener datos del usuario:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ error: error.response?.data || "Error interno del servidor" });
  }
};
