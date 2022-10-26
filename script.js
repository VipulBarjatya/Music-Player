const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "NCS-1",
    displayName: "On & On",
    artist: "Cartoon, Daniel Levi",
  },
  {
    name: "NCS-2",
    displayName: "Why We Lose",
    artist: "Cartoon, Coleman Trapp",
  },
  {
    name: "NCS-3",
    displayName: "Heroes Tonight",
    artist: "Janji, Johnning",
  },
  {
    name: "NCS-4",
    displayName: "Vision pt.II",
    artist: "She Is Jules, Lost Sky",
  },
  {
    name: "NCS-5",
    displayName: "Where We Started",
    artist: "Lost Sky, Jexrtoon",
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
  music.pause();
}

// Play or pause
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// update
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Prev Song
function prevSong() {
  songIndex < 0 ? (songIndex = songs.length - 1) : songIndex--;
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex > songs.length - 1 ? (songIndex = 0) : songIndex++;
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Selecting first Song
loadSong(songs[songIndex]);

// update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
}

// Even Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
