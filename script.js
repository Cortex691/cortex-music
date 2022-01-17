const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// Music
const song = [
    {
        name: 'smooth_criminal',
        displayName: 'Smooth Criminal',
        artist: 'Michael Jackson'
    },
    {
        name: 'escape_plan',
        displayName: 'ESCAPE PLAN',
        artist: 'Travis Scott'
    },
    {
        name: 'remember_the_time',
        displayName: 'Remember The Time',
        artist: 'Michael Jackson'
    },
    {
        name: 'Dna',
        displayName: 'DNA',
        artist: 'Kendrick Lamar'
    },
    {
        name: 'Out_of_time',
        displayName: 'Out of Time',
        artist: 'The Weeknd'
    },
    {
        name: 'corso',
        displayName: 'CORSO',
        artist: 'Tyler the Creator'
    },
    {
        name: 'bound_2',
        displayName: 'Bound 2',
        artist: 'Kanye West'
    },
    {
        name: 'Fair_trade',
        displayName: 'Fair Trade',
        artist: 'Drake'
    },
]

//Check if playing
let isPlaying

// Play
function playSong() {
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play()
}

//Pause
function pauseSong() {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause()
}

//Play or Pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))


//Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

//Current Song
let songIndex = 0

// PreviousSong
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = song.length - 1
    }
    loadSong(song[songIndex]);
    playSong()
}

// NextSong
function nextSong() {
    songIndex++;
    if (songIndex > song.length - 1) {
        songIndex = 0
    }
    loadSong(song[songIndex]);
    playSong()
}

//On load - Selecet first song
loadSong(song[songIndex])

//Update ProgressBar in Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement
        //Update progress bar width
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`
        //Calculate display for duration
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        //Delay switching duration element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }
        //Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60)
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}


//Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const { duration } = music
    music.currentTime = (clickX / width) * duration
}

//Event Listeners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)