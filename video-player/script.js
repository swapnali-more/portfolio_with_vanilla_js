const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const time = document.getElementById('timestamp');

function toggleVideoStatus() {
  video.paused ? video.play() : video.pause();
}

function updatePlayIcon() {
  const icon = video.paused ? 'fa-play' : 'fa-pause';
  play.innerHTML = `<i class="fa-solid ${icon}"></i>`;
}

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  const mins = Math.floor(video.currentTime / 60).toString().padStart(2, '0');
  const secs = Math.floor(video.currentTime % 60).toString().padStart(2, '0');
  time.innerHTML = `${mins}:${secs}`;
}

function setVideoProgress() {
  video.currentTime = (progress.value * video.duration) / 100;
}

function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('input', setVideoProgress);
