import Typed from "typed.js";
import { shuffle } from "./globalFunctions";
import { highlightElement, disableHighlight } from "./globalFunctions";

const openDialog = (dialogs, { discrete, isSpecial = false }) => {

    const dialogBox = document.querySelector(".dialog-box");
    discrete 
        ? dialogBox.classList.add("discrete")
        : dialogBox.classList.remove("discrete")
    
    const speechBox = dialogBox.querySelector(".speech");
    const audioDialogEntries = isSpecial 
        ? Array.from({length: 5}, (_, i) => i + 1) 
        : Array.from({length: 10}, (_, i) => i + 1);
    let audiosDialogIndex = shuffle(audioDialogEntries);
    const isAudioEnabled = JSON.parse(localStorage.getItem("isAudioEnabled"));
    let audioDialog, audioTyping;
    let startDelay = 750;
    dialogBox.showModal();
    speechBox.textContent = "";
    typeDialog(dialogs, isSpecial);

    function typeDialog(dialogs, isSpecial){

        const expressionElement = dialogs[0][0].match(/(?<=~)[^]*?(?=~)/);
        if(expressionElement){
            if(expressionElement[0] === "exit"){
                disableHighlight();
            } else {
                //Check if element exists
                const element = document.querySelector(expressionElement[0]);
                if(element) highlightElement(expressionElement[0]);
            }

            dialogs[0][0] = dialogs[0][0].replace(`~${expressionElement[0]}~`, "")
        }

        if(isAudioEnabled){
            if(!audiosDialogIndex.length){
                audiosDialogIndex = shuffle(audioDialogEntries);
            }
            audioDialog =  isSpecial 
            ? new Audio(`/assets/audios/dialogs/special-${audiosDialogIndex[0]}.ogg`)
            : new Audio(`/assets/audios/dialogs/normal-${audiosDialogIndex[0]}.ogg`);
            audioTyping = new Audio(`/assets/audios/typing/text_typing.ogg`);
            audioDialog.volume = parseFloat(localStorage.getItem("audioVolume")) * 0.75;
            audioTyping.volume = parseFloat(localStorage.getItem("audioVolume")) / 2;
            audiosDialogIndex.shift();
        }
        const typed = new Typed(speechBox, {
            strings: dialogs[0],
            typeSpeed: 25,
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
                        typeDialog(dialogs, isSpecial);
                    } else {
                        //dialogBox.close();
                    }
                }, 3500)
            }
        })
    }
 }
 
 export default openDialog