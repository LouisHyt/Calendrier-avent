import generateGifts from "./generateGifts";
import openDialog from "./openDialog";

const handleFirstConnect = () => {

    const firstConnectBox = document.querySelector(".first-connect");
    const audioAccept = document.querySelector(".audio-accept");
    const audioDeny = document.querySelector(".audio-deny");
    const enableAudioInput = document.querySelector("#enableAudio");

    audioAccept.addEventListener("click", handleOptionClicked);
    audioDeny.addEventListener("click", handleOptionClicked);

    firstConnectBox.showModal();

    async function handleOptionClicked(){
        if(this.classList.contains("audio-accept")){
            localStorage.setItem("isAudioEnabled", true);
            enableAudioInput.checked = true;
        } else {
            localStorage.setItem("isAudioEnabled", false);
            enableAudioInput.checked = false;
        }

        audioAccept.removeEventListener("click", handleOptionClicked);
        audioDeny.removeEventListener("click", handleOptionClicked);
        localStorage.setItem("isFirstConnect", false);
        firstConnectBox.close();
        await generateGifts(true);
        const lastGeneratedGift = document.querySelector(".gift-item:last-of-type");
        lastGeneratedGift.addEventListener("animationend", handleGiftAnimation) 
    }

    async function handleGiftAnimation(){
        const data = await fetch("/assets/jsons/dialogs/global_firstConnect.json")
        const jsonData = await data.json();
        openDialog(jsonData, {discrete: true});
        this.removeEventListener("animationend", handleGiftAnimation)
    }

}


export default handleFirstConnect