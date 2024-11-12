import Typed from "typed.js";

const openDialog = (dialogs) => {

    const dialogBox = document.querySelector(".dialog-box");
    const speechBox = dialogBox.querySelector(".speech");
    let audiosIndex = shuffleAudios([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const isAudioEnabled = JSON.parse(localStorage.getItem("isAudioEnabled"));
    let audioDialog;
    let startDelay = 750;
    dialogBox.showModal();
    speechBox.textContent = "";
    typeDialog(dialogs);

    function typeDialog(dialogs){
        if(isAudioEnabled){
            audioDialog = new Audio(`/assets/audios/dialogs/${audiosIndex[0]}.ogg`);
            audioDialog.volume = parseFloat(localStorage.getItem("audioVolume"));
            audiosIndex.shift();
        }
        const typed = new Typed(speechBox, {
            strings: dialogs[0],
            typeSpeed: 40,
            smartBackspace: true,
            showCursor: false,
            startDelay,
            contentType: 'html',
            backSpeed: 0,
            onBegin: () => {
                setTimeout(() => {
                    if(isAudioEnabled){
                        audioDialog.play()
                    }
                }, startDelay)
            },
            onComplete: () => {
                startDelay = 0;
                if(isAudioEnabled){   
                    audioDialog.pause();
                    audioDialog.currentTime = 0;
                }
                setTimeout(() => {
                    dialogs.shift();
                    speechBox.textContent = "";
                    if(dialogs.length){
                        typeDialog(dialogs);
                    } else {
                        dialogBox.close();
                    }
                }, 5000)
            }
        })
    }

    function shuffleAudios(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }
        return array;
    }
 }
 
 export default openDialog