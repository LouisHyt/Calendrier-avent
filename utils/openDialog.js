import Typed from "typed.js";

const openDialog = (dialogs) => {

    const dialogBox = document.querySelector(".dialog-box");
    const speechBox = dialogBox.querySelector(".speech");
    dialogBox.showModal();
    speechBox.textContent = "";
    typeDialog(dialogs);


    function typeDialog(dialogs){
        console.log(dialogs[0]);
        const typed = new Typed(speechBox, {
            strings: dialogs[0],
            typeSpeed: 40,
            smartBackspace: true,
            startDelay: 250,
            showCursor: false,
            contentType: 'html',
            backSpeed: 0,
            onComplete: () => {
                setTimeout(() => {
                    dialogs.shift();
                    if(dialogs.length){
                        speechBox.textContent = "";
                        typeDialog(dialogs);
                    } else {
                        dialogBox.close();
                    }
                }, 5000)
            },
            onStart: () => {

            }
        })
    }
 }
 
 export default openDialog