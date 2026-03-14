const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.static("frontend"));
app.listen(3000, () => {
  console.log("server is live at 3000");
});

app.get("/api/playlist", async (req, res) => {
  const API_KEY = process.env.API_KEY;
  const id = req.query.id;
  const API_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=50&key=${API_KEY}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  res.json(data);
});
