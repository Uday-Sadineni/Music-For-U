let player;
let playerReady;
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
      if (playerReady) {
        player.loadVideoById(videos[currentIndex].id);
      } else {
        console.log("wait a minuate. Player not ready yet");
      }
    })
    .catch((err) => console.log(err));
}

function loadYouTubeAPI() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }

    window.onYouTubeIframeAPIReady = () => {
      resolve();
    };

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
}

function start() {
  console.log("welcome to MFU");
  fetchmusic();
}

window.onYouTubeIframeAPIReady = function () {
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: "",
    playerVars: {
      origin: window.location.origin,
    },
    events: {
      onReady: () => {
        playerReady = true;
        console.log("Player ready");
      },
      onStateChange: onPlayerStateChange,
    },
  });
};

async function initPlayer() {
  await loadYouTubeAPI();

  player = new YT.Player("player", {
    height: "390",
    width: "640",
    playerVars: {
      origin: window.location.origin,
    },
    events: {
      onReady: () => {
        console.log("Player ready");
        playerReady = true;
          },
      onStateChange: onPlayerStateChange,
    },
  });
}

initPlayer();

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    currentIndex++;

    if (currentIndex < videos.length) {
      player.loadVideoById(videos[currentIndex].id);
    }
  }
}
