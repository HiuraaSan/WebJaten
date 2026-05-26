// ========================================================
// A. LOGIKA UTAMA: FILTER GALERI + ANIMASI GLIDER UNDERLINE
// ========================================================
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");
const glider = document.querySelector(".line-glider");

function moveGlider(activeButton) {
    if (!glider || !activeButton) return;
    const width = activeButton.offsetWidth;
    const left = activeButton.offsetLeft;
    glider.style.width = `${width}px`;
    glider.style.transform = `translateX(${left}px)`;
}

if (filterButtons.length > 0 && galleryItems.length > 0) {
    setTimeout(() => {
        const currentActive = document.querySelector(".filter-btn.active");
        if (currentActive) moveGlider(currentActive);
    }, 100);

    // Set default view: hanya tampilkan kategori "desa" di awal
    galleryItems.forEach(item => {
        const category = item.getAttribute("data-category");
        if (category !== "desa") {
            item.classList.add("hide");
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            moveGlider(button);

            const target = button.getAttribute("data-target");
            galleryItems.forEach(item => {
                const category = item.getAttribute("data-category");
                if (category === target) {
                    item.classList.remove("hide");
                } else {
                    item.classList.add("hide");
                }
            });
        });
    });

    window.addEventListener("resize", () => {
        const currentActive = document.querySelector(".filter-btn.active");
        if (currentActive) moveGlider(currentActive);
    });
}

// ========================================================
// B. LOGIKA MODAL POP-UP LIGHTBOX (BERANDA & GALERI)
// ========================================================
const lightboxOverlay = document.getElementById("lightboxOverlay");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDesc = document.getElementById("lightboxDesc");
const lightboxClose = document.getElementById("lightboxClose");

const allPotensiCards = document.querySelectorAll(".potensi-card");

if (lightboxOverlay) {
    function openPopup(imgSrc, titleText, descText) {
        if (!lightboxImg || !lightboxTitle || !lightboxDesc) return;
        lightboxImg.setAttribute("src", imgSrc);
        lightboxTitle.innerText = titleText;
        lightboxDesc.innerText = descText;

        lightboxOverlay.style.display = "flex";
        setTimeout(() => {
            lightboxOverlay.classList.add("show");
        }, 10);
    }

    // 💡 PENGAMAN: Deteksi klik item galeri dengan pengecekan elemen internal biar ga null-error
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener("click", () => {
                const imgEl = item.querySelector(".gallery-img-wrapper img");
                const titleEl = item.querySelector(".gallery-info h3");
                const pTag = item.querySelector(".gallery-info p");
                
                if (imgEl && titleEl) {
                    const imgSrc = imgEl.getAttribute("src");
                    const titleText = titleEl.innerText;
                    const descText = pTag ? pTag.innerText : "Dokumentasi resmi pengerjaan aset digital Desa Jaten.";
                    openPopup(imgSrc, titleText, descText);
                }
            });
        });
    }

    // 💡 PENGAMAN: Deteksi klik potensi-card dengan pengecekan elemen internal
    if (allPotensiCards.length > 0) {
        allPotensiCards.forEach(card => {
            card.addEventListener("click", () => {
                const imgEl = card.querySelector(".potensi-img-wrapper img");
                const titleEl = card.querySelector("h3");
                const pTag = card.querySelector("p");

                if (imgEl && titleEl && pTag) {
                    const imgSrc = imgEl.getAttribute("src");
                    const titleText = titleEl.innerText;
                    const descText = pTag.innerText;
                    openPopup(imgSrc, titleText, descText);
                }
            });
        });
    }

    function closeLightbox() {
        lightboxOverlay.classList.remove("show");
        setTimeout(() => {
            lightboxOverlay.style.display = "none";
        }, 400);
    }

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

    lightboxOverlay.addEventListener("click", (e) => {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightboxOverlay.classList.contains("show")) {
            closeLightbox();
        }
    });
}

// ========================================================
// D. LOGIKA REVEAL ANIMATION (SLIDE UP + FADE IN)
// ========================================================
function triggerReveal() {
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active-reveal");
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15 
    });

    reveals.forEach(el => observer.observe(el));
}
document.addEventListener("DOMContentLoaded", triggerReveal);

// ========================================================
// E. HOYOLAB MUSIC PLAYER + PARSER SINKRONISASI FILE LRC
// ========================================================
const playlist = [
    {
        title: "If I Can Stop One Heart From Breaking",
        artist: "Robin (Honkai: Star Rail)",
        src: "assets/song/song1.mp3",
        cover: "assets/img/mywife.webp",
        lrc: `[00:00.00]🎵 If I Can Stop One Heart From Breaking
[00:03.10]HOYO-MIX
[00:06.02]If I Can Stop One Heart From Breaking
[00:08.91]...
[00:11.82]Birds are born with no shackles
[00:17.13]Then what fetters my fate?
[00:23.48]Blown away, the white petals
[00:28.86]Leave me trapped in the cage
[00:35.77]The endless isolation
[00:38.45]Can wear down my illusion
[00:41.47]Someday, I’ll make a dream unchained
[00:47.88]Let my heart bravely spread the wings
[00:52.45]Soaring past the night, to trace the primal light
[01:00.26]Let the clouds heal me of the stains
[01:04.39]Gently wipe the sorrow of my life
[01:08.51]I Dream
[01:12.01]...
[01:17.44]What is meant by miracle?
[01:23.65]A word outside my days
[01:29.62]Once again, repeatable
[01:34.98]But how could I escape?
[01:41.46]No further hesitation
[01:44.29]On those unanswered questions
[01:47.57]So now, I’ll make a dream unchained
[01:55.51]...
[02:00.10]Let my heart bravely spread the wings
[02:04.46]Soaring past the night, to trace the primal light
[02:12.19]Let the clouds heal me of the stains
[02:16.36]Gently wipe the sorrow of my life
[02:20.82]I Dream
[02:26.33]...
[02:36.20]Let my heart bravely spread the wings
[02:40.48]Soaring past the night, to trace the primal light
[02:48.14]Let the clouds heal me of the stains
[02:52.74]Gently wipe the sorrow of my life
[02:59.61]I Dream
[03:03.52]...
[03:05.09]I Dream
[03:08.54]🎵 (Outro - Finished)`
    }
];

let currentTrackIndex = 0;
let isPlaying = false;
let parsedLyrics = []; 

const audio = document.getElementById("main-audio");
const btnPlay = document.getElementById("btnPlay");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const trackDisc = document.getElementById("trackDisc");
const progressFill = document.getElementById("progressFill");
const timeCurrent = document.getElementById("timeCurrent");
const timeTotal = document.getElementById("timeTotal");

const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const playerCover = document.getElementById("playerCover");
const playIcon = document.getElementById("playIcon");
const lyricsContainer = document.getElementById("lyricsContainer");

function parseLRC(lrcText) {
    const lines = lrcText.split("\n"); 
    const result = [];
    const timeRegEx = /\[(\d{2}):(\d{2})\.(\d{2})\]/;

    lines.forEach(line => {
        const match = timeRegEx.exec(line);
        if (match) {
            const minutes = parseInt(match[1]);
            const seconds = parseInt(match[2]);
            const milliseconds = parseInt(match[3]);
            const totalSeconds = minutes * 60 + seconds + milliseconds / 100;
            
            let text = line.replace(timeRegEx, "").trim();
            if (text === "") {
                text = "•  •  •";
            }
            result.push({ time: totalSeconds, text: text });
        }
    });
    return result.sort((a, b) => a.time - b.time);
}

function renderLyrics(lyricsArray) {
    if (!lyricsContainer) return;
    lyricsContainer.innerHTML = ""; 
    
    lyricsArray.forEach((lyric, index) => {
        const p = document.createElement("p");
        p.classList.add("lyric-line");
        p.setAttribute("data-index", index);
        p.textContent = lyric.text;
        lyricsContainer.appendChild(p);
    });
}

function loadTrack(index) {
    if (!playlist[index] || !audio) return; 
    const track = playlist[index];
    audio.src = track.src;
    if (playerTitle) playerTitle.textContent = track.title;
    if (playerArtist) playerArtist.textContent = track.artist;
    if (playerCover) playerCover.src = track.cover;
    
    parsedLyrics = parseLRC(track.lrc);
    renderLyrics(parsedLyrics);
}

function togglePlay() {
    if (!audio) return;
    if (isPlaying) {
        audio.pause();
        if (trackDisc) trackDisc.style.animationPlayState = "paused";
        if (playIcon) playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>'; 
        isPlaying = false;
    } else {
        audio.play()
            .then(() => {
                if (trackDisc) trackDisc.style.animationPlayState = "running";
                if (playIcon) playIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>'; 
            })
            .catch(e => {
                console.log("Mesti interaksi user dulu: ", e);
                isPlaying = false;
                if (trackDisc) trackDisc.style.animationPlayState = "paused";
                if (playIcon) playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
            });
        isPlaying = true;
    }
}

if (audio) {
    audio.addEventListener("timeupdate", () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration || 0;
        
        const progressPercent = (currentTime / duration) * 100;
        if (progressFill) progressFill.style.width = `${progressPercent}%`;
        
        let curMins = Math.floor(currentTime / 60);
        let curSecs = Math.floor(currentTime % 60);
        let durMins = Math.floor(duration / 60);
        let durSecs = Math.floor(duration % 60);
        
        if (curSecs < 10) curSecs = "0" + curSecs;
        if (durSecs < 10) durSecs = "0" + durSecs;
        
        if (timeCurrent) timeCurrent.textContent = `${curMins}:${curSecs}`;
        if (timeTotal) timeTotal.textContent = `${durMins}:${durSecs}`;

        if (currentTime > 0) {
            localStorage.setItem("jaten_track_time", currentTime);
        }

        if (parsedLyrics.length > 0 && lyricsContainer) {
            let activeIndex = -1;
            for (let i = 0; i < parsedLyrics.length; i++) {
                if (currentTime >= parsedLyrics[i].time) {
                    activeIndex = i;
                } else {
                    break;
                }
            }
            
            if (activeIndex !== -1) {
                const allLines = lyricsContainer.querySelectorAll(".lyric-line");
                allLines.forEach(line => line.classList.remove("active-reveal", "active-lyric"));
                
                const activeLine = lyricsContainer.querySelector(`[data-index="${activeIndex}"]`);
                if (activeLine) {
                    activeLine.classList.add("active-lyric");
                    
                    const hoyoPlayer = document.getElementById("hoyoPlayer");
                    if (hoyoPlayer && hoyoPlayer.classList.contains("expanded")) {
                        activeLine.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });
                    }
                }
            }
        }
    });

    audio.addEventListener("ended", () => {
        audio.currentTime = 0;
        audio.play();
    });
}

const actualProgressBar = document.querySelector(".progress-bar");
if (actualProgressBar && audio) {
    actualProgressBar.addEventListener("click", (e) => {
        const rect = actualProgressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const duration = audio.duration || 0;
        
        if (width > 0 && duration > 0) {
            audio.currentTime = (clickX / width) * duration;
        }
    });
}

if (btnNext && audio) {
    btnNext.addEventListener("click", () => {
        audio.currentTime = 0;
        if (isPlaying) audio.play();
    });
}

if (btnPrev && audio) {
    btnPrev.addEventListener("click", () => {
        audio.currentTime = 0;
        if (isPlaying) audio.play();
    });
}

if (btnPlay) btnPlay.addEventListener("click", togglePlay);

// ========================================================
// RE-STRUKTUR: PEMUATAN MEMORI SINKRONISASI ANTAR HALAMAN
// ========================================================
window.addEventListener("DOMContentLoaded", () => {
    if (!audio) return;
    const savedIndex = localStorage.getItem("jaten_track_index");
    const savedTime = localStorage.getItem("jaten_track_time");
    const savedPlaying = localStorage.getItem("jaten_track_playing");

    if (savedIndex !== null) {
        currentTrackIndex = parseInt(savedIndex);
    }
    if (currentTrackIndex >= playlist.length) {
        currentTrackIndex = 0;
    }

    loadTrack(currentTrackIndex);

    if (savedTime !== null) {
        audio.currentTime = parseFloat(savedTime);
    }
    
    if (savedPlaying === "true") {
        isPlaying = true;
        audio.play()
            .then(() => {
                if (trackDisc) trackDisc.style.animationPlayState = "running";
                if (playIcon) playIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
            })
            .catch(e => {
                console.log("Autoplay ditahan browser:", e);
                isPlaying = false;
                if (trackDisc) trackDisc.style.animationPlayState = "paused";
                if (playIcon) playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
            });
    }
});

window.addEventListener("beforeunload", () => {
    if (audio) {
        localStorage.setItem("jaten_track_index", currentTrackIndex);
        localStorage.setItem("jaten_track_time", audio.currentTime);
        localStorage.setItem("jaten_track_playing", isPlaying);
    }
});

// ========================================================
// F. TOGGLE EXPANDED LYRICS LOGIC
// ========================================================
const btnLyrics = document.getElementById("btnLyrics");
const hoyoPlayer = document.getElementById("hoyoPlayer");

if (btnLyrics && hoyoPlayer) {
    btnLyrics.addEventListener("click", () => {
        hoyoPlayer.classList.toggle("expanded");
        
        if(hoyoPlayer.classList.contains("expanded")) {
            setTimeout(() => {
                const activeLyric = document.querySelector(".active-lyric");
                if(activeLyric) activeLyric.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    });
}

// ========================================================
// G. LOGIKA MINIMIZE PLAYER UNTUK USER MOBILE/ANDROID
// ========================================================
const btnMinimize = document.getElementById("btnMinimize");
const currentHoyoPlayer = document.getElementById("hoyoPlayer");
const trackDiscClick = document.getElementById("trackDisc");

if (btnMinimize && currentHoyoPlayer) {
    const toggleMinimize = () => {
        currentHoyoPlayer.classList.toggle("minimized");
        
        if (currentHoyoPlayer.classList.contains("minimized")) {
            btnMinimize.textContent = "+";
            btnMinimize.setAttribute("title", "Maximize Player");
        } else {
            btnMinimize.textContent = "−";
            btnMinimize.setAttribute("title", "Minimize Player");
        }
    };

    btnMinimize.addEventListener("click", (e) => {
        e.stopPropagation(); 
        toggleMinimize();
    });

    if (trackDiscClick) {
        trackDiscClick.addEventListener("click", () => {
            if (currentHoyoPlayer.classList.contains("minimized")) {
                toggleMinimize();
            }
        });
    }
}
