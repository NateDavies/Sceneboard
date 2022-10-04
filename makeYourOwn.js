let choice;
var body = document.getElementById('body');
var masterContainer = document.getElementById('indiMasterContainer');
var hideMaster = document.getElementById('hideMaster');
let images = Array.from(document.getElementsByClassName('indiImage'));
var backgrounds = document.getElementsByClassName('background');
var volumes = document.getElementsByClassName('indiVolume');
var mutes = document.getElementsByClassName('muteButton');


hideMaster.addEventListener('click', showHide);

for (i = 0; i < backgrounds.length; i++) {
    backgrounds[i].addEventListener('click', changeBackground);
}

for (i = 0; i < images.length; i++) {
    images[i].addEventListener('click', indiSound);
}

for (i = 0; i < volumes.length; i++) {
    volumes[i].addEventListener('click', indiVolumeControl);
}

for (i = 0; i < mutes.length; i++) {
    mutes[i].addEventListener('click', indiMute);
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

function indiSound(e) {

    choice = e.target.id.replace('Button', '');
    choiceAudio = document.getElementById(`${choice}Audio`);
    choiceVolume = document.getElementById(`${choice}Volume`)
    choiceImage = document.getElementById(`${choice}Button`);
    choiceMuteButton = document.getElementById(`${choice}MuteButton`);

    if (choiceAudio.classList.contains('on')) {
        choiceAudio.pause();
        choiceAudio.classList.remove('on');
    } else {
        choiceAudio.play();
        choiceAudio.classList.add('on');
    }

    choiceAudio.volume = choiceVolume.value / 100;

    if (!choiceMuteButton.classList.contains('on')) {
        choiceAudio.volume = 0;
    }

    if (choiceImage.classList.contains('on')) {
            choiceImage.classList.remove('on');
            choiceImage.style.opacity = '100%';
        } else {
            choiceImage.classList.add('on');
            choiceImage.style.opacity = '50%';
        }
}

function indiVolumeControl(e) {

    choice = e.target.id.replace('Volume', '');
    choiceAudio = document.getElementById(`${choice}Audio`);
    choiceMuteButton = document.getElementById(`${choice}MuteButton`);

    choiceAudio.volume = e.currentTarget.value / 100;

    if (!choiceMuteButton.classList.contains('on')) {
        choiceAudio.volume = 0;
    }
}

function indiMute(e) {

    choice = e.target.id.replace('MuteButton', '');
    choiceAudio = document.getElementById(`${choice}Audio`);
    choiceMuteButton = document.getElementById(`${choice}MuteButton`);
    choiceVolume = document.getElementById(`${choice}Volume`);
    

    if (choiceMuteButton.classList.contains('on')) {
        choiceMuteButton.classList.remove('on');
        choiceMuteButton.src = 'images/volumeMute.png';
        choiceAudio.volume = 0;
    } else {
        choiceMuteButton.classList.add('on');
        choiceMuteButton.src = 'images/volumeOn.png';
        choiceAudio.volume = choiceVolume.value / 100;
    }

}

function changeBackground(e) {
    choice = e.target.id.replace('Background', '');
    choiceImage = document.getElementById(`${choice}Background`);
    body.style.backgroundImage = `url("images/${choice}.jpg")`;

    if (choiceImage.classList.contains('on')) {
        choiceImage.classList.remove('on');
        choiceImage.style.opacity = '100%';
    } else {
        choiceImage.classList.add('on');
        choiceImage.style.opacity = '50%';
    }

    for (const background of backgrounds) {
        if (background.classList.contains('on') && !(background === choiceImage)) {
        background.classList.remove('on');
        background.style.opacity = '100%';
        }
    }
}
