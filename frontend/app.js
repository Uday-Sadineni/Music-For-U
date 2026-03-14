let player;
let videos = [];
let currentIndex = 0;

function fetchmusic() {
  const url = document.getElementById("playlistUrl").value;

  if (!url) {
    alert("Paste playlist URL");
    return;
  }

  const id = new URL(url).searchParams.get("list");

  fetch(`/api/playlist?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      videos = data.items.map((v) => ({
        id: v.snippet.resourceId.videoId,
        title: v.snippet.title,
      }));

      currentIndex = 0;
      player.loadVideoById(videos[currentIndex].id);
    })
    .catch((err) => console.log(err));
}

function start() {
  console.log("welcome to MFU");
  fetchmusic();
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: "",
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    currentIndex++;

    if (currentIndex < videos.length) {
      player.loadVideoById(videos[currentIndex].id);
    }
  }
}
