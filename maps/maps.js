// ساده و کاربردی: هشدار سازنده
function showAlert() {
  alert("سازنده وبگاه: Skyer");
}

/* کنترل‌های ویدیو */
document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('mapVideo');
  const playPause = document.getElementById('playPause');
  const progressContainer = document.getElementById('progressContainer');
  const progressBar = document.getElementById('progressBar');
  const currentTimeEl = document.getElementById('currentTime');
  const durationEl = document.getElementById('duration');
  const volume = document.getElementById('volume');
  const muteBtn = document.getElementById('muteBtn');
  const fsBtn = document.getElementById('fsBtn');

  // وقتی متادیتا لود شد، مدت زمان را نمایش بده
  video.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(video.duration);
    progressBar.style.width = '0%';
  });

  // آپدیت نوار پیشرفت و زمان فعلی
  video.addEventListener('timeupdate', () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = percent + '%';
    currentTimeEl.textContent = formatTime(video.currentTime);
  });

  // دکمه پخش/توقف
  playPause.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playPause.textContent = '⏸';
    } else {
      video.pause();
      playPause.textContent = '▶';
    }
  });

  // کلیک روی نوار برای جابجایی
  progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    video.currentTime = pct * video.duration;
  });

  // کنترل صدا
  volume.addEventListener('input', () => {
    video.volume = volume.value;
    if (video.volume === 0) {
      muteBtn.textContent = '🔈';
    } else {
      muteBtn.textContent = '🔊';
    }
  });

  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? '🔈' : '🔊';
    if (video.muted) volume.dataset.prev = volume.value, volume.value = 0;
    else volume.value = volume.dataset.prev || 0.8;
    video.volume = volume.value;
  });

  // تمام صفحه
  fsBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      video.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  });

  // فرمت زمان به mm:ss
  function formatTime(sec) {
    if (!isFinite(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

 
 
  document.getElementById('previewBtn').addEventListener('click', (e) => {
    e.preventDefault();
    // نمونه: اسکرول به ویدیو و پخش
    document.getElementById('mapVideo').scrollIntoView({ behavior: 'smooth' });
    video.play();
    playPause.textContent = '⏸';
  });
  document.getElementById('shareBtn').addEventListener('click', () => {
    // اگر Web Share API موجود باشد از آن استفاده کن
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: 'این Mapes را ببینید',
        url: location.href
      }).catch(()=>{});
    } else {
      // fallback
      navigator.clipboard?.writeText(location.href).then(()=> {
        alert('لینک کپی شد.');
      }).catch(()=> {
        alert('لینک: ' + location.href);
      });
    }
  });
});