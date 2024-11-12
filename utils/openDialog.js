import Typed from "typed.js";
import { shuffle } from "./globalFunctions";

const openDialog = (dialogs) => {

    const dialogBox = document.querySelector(".dialog-box");
    const speechBox = dialogBox.querySelector(".speech");
    let audiosIndex = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
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
                    if(dialogs.length){
                        speechBox.textContent = "";
                        typeDialog(dialogs);
                    } else {
                        dialogBox.close();
                    }
                }, 5000)
            }
        })
    }
 }
 
 export default openDialog