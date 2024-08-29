const playlist = [
    {
        title: "The Secret of us",
        artist: "Gracie Abrams",
        src: "https://music.apple.com/ng/album/i-love-you-im-sorry/1743054543?i=1743054747",
        img: "assest/IMG_1593.jpg"
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        src: "song2.mp3",
        img: "album2.jpg"
    }
];

document.getElementById('track-link').href = playlist[0]. link;

let currentIndex = 0;

const trackTitle = document.getElementById('trackTitle');
const artistName = document.getElementById('artistName');
const albumArt = document.getElementById('albumArt');
const audioPlayer = new Audio();
const playPauseBtn = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const seekBar = document.getElementById('seekBar');
const currentTime = document.getElementById('currentTime');
const totalDuration = document.getElementById('totalDuration');
const volumeControl = document.getElementById('volumeControl');
const playlistElement = document.getElementById('playlist');

function loadTrack(index) {
    const track = playlist[index];
    trackTitle.innerText = track.title;
    artistName.innerText = track.artist;
    albumArt.src = IMG_1593.jpg;
    audioPlayer.src = "https://music.apple.com/ng/album/i-love-you-im-sorry/1743054543?i=1743054747"
    audioPlayer.onloadedmetadata = () => {
        totalDuration.innerText = formatTime(audioPlayer.duration);
        seekBar.max = audioPlayer.duration;
    };
}

function playPauseTrack() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.innerText = "⏸️";
    } else {
        audioPlayer.pause();
        playPauseBtn.innerText = "⏯️";
    }
}

function nextTrack() {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadTrack(currentIndex);
    playPauseTrack();
}

function prevTrack() {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentIndex);
    playPauseTrack();
}

function updateSeekBar() {
    seekBar.value = audioPlayer.currentTime;
    currentTime.innerText = formatTime(audioPlayer.currentTime);
}

function setTrackPosition() {
    audioPlayer.currentTime = seekBar.value;
}

function adjustVolume() {
    audioPlayer.volume = volumeControl.value / 100;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

audioPlayer.addEventListener('timeupdate', updateSeekBar);
seekBar.addEventListener('input', setTrackPosition);
volumeControl.addEventListener('input', adjustVolume);
playPauseBtn.addEventListener('click', playPauseTrack);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

playlist.forEach((track, index) => {
    const li = document.createElement('li');
    li.innerText = `${track.title} - ${track.artist}`;
    li.onclick = () => {
        currentIndex = index;
        loadTrack(currentIndex);
        playPauseTrack();
    };
    playlistElement.appendChild(li);
});

loadTrack(currentIndex);