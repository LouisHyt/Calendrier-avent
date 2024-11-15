import Typed from "typed.js";
import { shuffle } from "./globalFunctions";
import { highlightElement, disableHighlight } from "./globalFunctions";

const openDialog = (dialogs, { discrete }) => {

    const dialogBox = document.querySelector(".dialog-box");
    discrete 
        ? dialogBox.classList.add("discrete")
        : dialogBox.classList.remove("discrete")
    
    const speechBox = dialogBox.querySelector(".speech");
    const audioDialogEntries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let audiosDialogIndex = shuffle(audioDialogEntries);
    const isAudioEnabled = JSON.parse(localStorage.getItem("isAudioEnabled"));
    let audioDialog, audioTyping;
    let startDelay = 750;
    dialogBox.showModal();
    speechBox.textContent = "";
    typeDialog(dialogs);

    function typeDialog(dialogs){

        const expressionElement = dialogs[0][0].match(/(?<=~)[^]*?(?=~)/);
        if(expressionElement){
            if(expressionElement[0] === "exit"){
                disableHighlight();
            } else {
                highlightElement(expressionElement[0]);
            }

            dialogs[0][0] = dialogs[0][0].replace(`~${expressionElement[0]}~`, "")
        }

        if(isAudioEnabled){
            if(!audiosDialogIndex.length){
                audiosDialogIndex = shuffle(audioDialogEntries);
            }
            audioDialog = new Audio(`/assets/audios/dialogs/${audiosDialogIndex[0]}.ogg`);
            audioTyping = new Audio(`/assets/audios/typing/text_typing.ogg`);
            audioDialog.volume = parseFloat(localStorage.getItem("audioVolume"));
            audioTyping.volume = parseFloat(localStorage.getItem("audioVolume")) / 2;
            audiosDialogIndex.shift();
        }
        const typed = new Typed(speechBox, {
            strings: dialogs[0],
            typeSpeed: 30,
            smartBackspace: true,
            showCursor: false,
            startDelay,
            contentType: 'html',
            backSpeed: 0,
            onBegin: () => {
                setTimeout(() => {
                    if(isAudioEnabled){
                        audioDialog.play();
                        audioTyping.play();
                    }
                }, startDelay)
            },
            onTypingPaused: () => {
                if(isAudioEnabled){
                    audioDialog.pause();
                    audioTyping.pause();
                }
            },
            onTypingResumed: () => {
                if(isAudioEnabled){
                    audioDialog.play();
                    audioTyping.play();
                }
            },
            onComplete: () => {
                startDelay = 0;
                if(isAudioEnabled){   
                    audioDialog.pause();
                    audioTyping.pause();
                    audioDialog.currentTime = 0;
                    audioTyping.currentTime = 0;
                }
                setTimeout(() => {
                    dialogs.shift();
                    if(dialogs.length){
                        speechBox.textContent = "";
                        typeDialog(dialogs);
                    } else {
                        // dialogBox.close();
                    }
                }, 3500)
            }
        })
    }
 }
 
 export default openDialog