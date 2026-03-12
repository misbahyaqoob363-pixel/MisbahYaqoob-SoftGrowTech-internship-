let audio = document.getElementById("audio")
let songs = document.querySelectorAll(".list li")
let playBtn = document.getElementById("play")
let progress = document.getElementById("progress")
let cover = document.getElementById("cover")
let songTitle = document.getElementById("songTitle")

let current = 0

// Load a song
function loadSong(index){
  let song = songs[index]
  audio.src = song.getAttribute("data-src")
  cover.src = song.getAttribute("data-cover")
  songTitle.innerText = song.innerText
  highlightActive()
}

// Highlight active song and show "Now Playing" below its name
function highlightActive(){
  songs.forEach((s,i)=>{
    // Remove previous "Now Playing" span if exists
    let existing = s.querySelector(".nowPlayingLabel")
    if(existing) existing.remove()

    if(i === current){
      s.classList.add("active")
      // Create new span below song name
      let span = document.createElement("div")
      span.classList.add("nowPlayingLabel")
      span.innerText = "Now Playing"
      s.appendChild(span)
    } else{
      s.classList.remove("active")
    }
  })
}

// Play song on click
songs.forEach((song,index)=>{
  song.addEventListener("click", ()=>{
    current = index
    loadSong(current)
    audio.play()
    playBtn.innerHTML = "⏸"
  })
})

// Play/Pause
playBtn.onclick = function(){
  if(!audio.src) loadSong(current)
  if(audio.paused){
    audio.play()
    playBtn.innerHTML = "⏸"
  } else{
    audio.pause()
    playBtn.innerHTML = "▶"
  }
}

// Next song
document.getElementById("next").onclick = function(){
  current = (current + 1) % songs.length
  loadSong(current)
  audio.play()
  playBtn.innerHTML = "⏸"
}

// Previous song
document.getElementById("prev").onclick = function(){
  current = (current - 1 + songs.length) % songs.length
  loadSong(current)
  audio.play()
  playBtn.innerHTML = "⏸"
}

// Progress & time update
audio.addEventListener("timeupdate", ()=>{
  if(audio.duration){
    progress.value = (audio.currentTime / audio.duration) * 100
    document.getElementById("currentTime").innerText = formatTime(audio.currentTime)
    document.getElementById("duration").innerText = formatTime(audio.duration)
  }
})

// Seek
progress.oninput = function(){
  audio.currentTime = (progress.value / 100) * audio.duration
}

// Volume
document.getElementById("volume").oninput = function(){
  audio.volume = this.value
}

// Format time
function formatTime(sec){
  let minutes = Math.floor(sec / 60)
  let seconds = Math.floor(sec % 60)
  if(seconds < 10) seconds = "0" + seconds
  return `${minutes}:${seconds}`
}

// Auto next
audio.addEventListener("ended", ()=>{
  current = (current + 1) % songs.length
  loadSong(current)
  audio.play()
  playBtn.innerHTML = "⏸"
})

// Load first song initially
loadSong(current)