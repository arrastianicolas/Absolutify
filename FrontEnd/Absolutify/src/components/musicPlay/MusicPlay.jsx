import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import React, { useEffect } from "react";
import { usePlayback } from "../../contexts/PlayTrackContext";
import { useTraduction } from "../../custom/TraductionDictionary";

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: "100%",
  height: "150px",
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor: "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(0,0,0,0.6)",
  }),
  "@media (max-width: 768px)": {
    height: "200px", // Altura diferente en dispositivos móviles
  },
}));

const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
});

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function MusicPlayerSlider() {
  const [position, setPosition] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const { currentTrack, playTrack, currentTrackId, setCurrentTrack } =
    usePlayback();
  const { t } = useTraduction();

  useEffect(() => {
    if (currentTrackId) {
      playTrack(currentTrackId);
    }
  }, [currentTrackId]);

  useEffect(() => {
    if (currentTrack) {
      localStorage.setItem("lastTrack", JSON.stringify(currentTrack));
    }
  }, [currentTrack]);
  useEffect(() => {
    const savedTrack = JSON.parse(localStorage.getItem("lastTrack"));
    if (savedTrack) {
      setCurrentTrack(savedTrack);
    }
  }, []);
  const formatDuration = (time) => {
    if (isNaN(time) || time === undefined) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Box className="fixed bottom-0 max-w-full overflow-hidden left-4 md:left-0 md:pr-0 md:overflow-y-hidden md:relative ">
      <Widget>
        <div className="flex-row items-center justify-between w-full mx-auto md:flex">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CoverImage>
              <img
                alt="can't win - Chilling Sunday"
                src={
                  currentTrack &&
                  currentTrack.album?.images &&
                  currentTrack.album?.images[0]
                    ? currentTrack.album?.images[0].url
                    : "/png/logo.png"
                }
              />
            </CoverImage>
            <Box
              sx={{ ml: 1.5, minWidth: 0, width: "250px", overflow: "hidden" }}
            >
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                {currentTrack?.artists
                  .map((artist) => artist.name)
                  .join(", ") || "Unknown Artist"}
              </Typography>
              <Typography noWrap>
                <b>{currentTrack?.name || "Unknown name"}</b>
              </Typography>
              <Typography noWrap sx={{ letterSpacing: -0.25 }}>
                {currentTrack?.type === "track" ? t("cancion") : "playlists"}
              </Typography>
            </Box>
          </Box>
          <div className="2xl:w-[700px] xl:w-[500px] w-[300px] md:mx-0 mx-auto relative md:top-4 2xl:right-20 xl:right-[80px] flex-shrink-0">
            <Slider
              aria-label="time-indicator"
              size="small"
              value={position}
              min={0}
              step={1}
              max={
                currentTrack?.duration_ms
                  ? currentTrack.duration_ms / 60000
                  : 200
              }
              onChange={(_, value) => setPosition(value)}
              sx={(t) => ({
                color: "rgba(0,0,0,0.87)",
                height: 4,
                "& .MuiSlider-thumb": {
                  width: 10,
                  height: 10,
                  transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                  "&::before": {
                    boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                  },
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: `0px 0px 0px 8px ${"rgb(0 0 0 / 16%)"}`,
                    ...t.applyStyles("dark", {
                      boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
                    }),
                  },
                  "&.Mui-active": {
                    width: 20,
                    height: 20,
                  },
                },
                "& .MuiSlider-rail": {
                  opacity: 0.28,
                },
                ...t.applyStyles("dark", {
                  color: "#fff",
                }),
              })}
            />
          </div>
          <div className="2xl:w-[200px] xl:w-[200px] relative md:top-[20px] w-[150px] bottom-[98px] left-48 md:bottom-0 md:left-0 2xl:right-5 xl:right-16">
            <Stack
              spacing={2}
              direction="row"
              sx={(theme) => ({
                mb: 1,
                px: 1,
                "& > svg": {
                  color: "rgba(0,0,0,0.4)",
                  ...theme.applyStyles("dark", {
                    color: "rgba(255,255,255,0.4)",
                  }),
                },
              })}
              alignItems="center"
            >
              <VolumeDownRounded />
              <Slider
                aria-label="Volume"
                defaultValue={30}
                orientation="horizontal"
                sx={(t) => ({
                  color: "rgba(0,0,0,0.87)",
                  "& .MuiSlider-track": {
                    border: "none",
                  },
                  "& .MuiSlider-thumb": {
                    width: 12,
                    height: 12,
                    backgroundColor: "#fff",
                    "&::before": {
                      boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                    },
                    "&:hover, &.Mui-focusVisible, &.Mui-active": {
                      boxShadow: "none",
                    },
                  },
                  ...t.applyStyles("dark", {
                    color: "#fff",
                  }),
                })}
              />
              <VolumeUpRounded />
            </Stack>
          </div>
        </div>
        <Box className="flex items-center justify-center md:-mt-9 -mt-20 2xl:gap-[640px] xl:gap-[450px] gap-[250px]">
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>
            -
            {formatDuration(
              Math.max(0, currentTrack?.duration_ms / 1000 - position)
            )}
          </TinyText>
        </Box>
        <Box
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: -1,
            "& svg": {
              color: "#000",
              ...theme.applyStyles("dark", {
                color: "#fff",
              }),
            },
          })}
        >
          <IconButton aria-label="previous song">
            <FastRewindRounded fontSize="large" />
          </IconButton>
          <IconButton
            aria-label={paused ? "play" : "pause"}
            onClick={() => setPaused(!paused)}
          >
            {paused ? (
              <PlayArrowRounded sx={{ fontSize: "3rem" }} />
            ) : (
              <PauseRounded sx={{ fontSize: "3rem" }} />
            )}
          </IconButton>
          <IconButton aria-label="next song">
            <FastForwardRounded fontSize="large" />
          </IconButton>
        </Box>
      </Widget>
    </Box>
  );
}
