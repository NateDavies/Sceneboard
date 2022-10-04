var body = document.getElementById('body');
var hideMaster = document.getElementById('hideMaster');
var masterContainer = document.getElementById('sceneMasterContainer');
var sceneMuteButton = document.getElementById('sceneMuteButton');
var sceneMasterVolume = document.getElementById('sceneMasterVolume');
let audios = Array.from(document.getElementsByClassName('sceneAudio'));
let volumes = Array.from(document.getElementsByClassName('sceneVolume'));
let images = document.getElementsByClassName('sceneImage');
let scene;

for (i = 0; i < images.length; i++) {
    images[i].addEventListener('click', sceneAction);
}
sceneMuteButton.addEventListener('click', sceneVolumeMute);
sceneMasterVolume.addEventListener('change', sceneVolumeControl);
hideMaster.addEventListener('click', showHide);

function sceneAction(e) {
    scene = e.target.id.replace('Button', '');
    body.style.backgroundImage = `url("images/${scene}.jpg")`
    sceneAudio = document.getElementById(`${scene}Audio`);
    sceneImage = document.getElementById(`${scene}Button`);

    if (sceneAudio.classList.contains('on')) {
        sceneAudio.pause();
        sceneAudio.classList.remove('on');
    } else {
        sceneAudio.play();
        sceneAudio.classList.add('on');
    }

    for (const audio of audios) {
        if (audio.classList.contains('on') && !(audio === sceneAudio)) {
            audio.pause();
            audio.classList.remove('on');
        }
    }

    if (sceneMuteButton.classList.contains('on')) {
        sceneAudio.volume = sceneMasterVolume.value / 100;
    } else {
        sceneAudio.volume = 0;
    }

    if (sceneImage.classList.contains('on')) {
            sceneImage.classList.remove('on');
            sceneImage.style.opacity = '100%';
        } else {
            sceneImage.classList.add('on');
            sceneImage.style.opacity = '50%';
        }

    for (const image of images) {
        if (image.classList.contains('on') && !(image === sceneImage)) {
            image.classList.remove('on');
            image.style.opacity = '100%';
        }
    } 
}

function sceneVolumeMute() {
    if (sceneMuteButton.classList.contains('on')) {
        sceneMuteButton.classList.remove('on');
        sceneMuteButton.src = 'images/volumeMute.png';
        for (const audio of audios) {
            if (audio.classList.contains('on')) {
                audio.volume = 0;
            }
        }
    } else {
        sceneMuteButton.classList.add('on');
        sceneMuteButton.src = 'images/volumeOn.png';
        for (const audio of audios) {
            if (audio.classList.contains('on')) {
                audio.volume = sceneMasterVolume.value / 100;
            }
        }
    }
}

function sceneVolumeControl(e) {
    for (const audio of audios) {
        if (audio.classList.contains('on') && (sceneMuteButton.classList.contains('on'))) {
            audio.volume = e.currentTarget.value / 100;
        }
    }
}

function showHide() {
    if (masterContainer.classList.contains('show')) {
        masterContainer.style.display = 'none';
        masterContainer.classList.remove('show');
        hideMaster.innerHTML = 'Show Content';
    } else {
        masterContainer.style.display = 'flex';
        masterContainer.classList.add('show');
        hideMaster.innerHTML = 'Hide Content';
    }
}
