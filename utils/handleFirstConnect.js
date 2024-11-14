import generateGifts from "./generateGifts";

const handleFirstConnect = () => {

    const firstConnectBox = document.querySelector(".first-connect");
    const audioAccept = document.querySelector(".audio-accept");
    const audioDeny = document.querySelector(".audio-deny");

    audioAccept.addEventListener("click", handleOptionClicked);
    audioDeny.addEventListener("click", handleOptionClicked);

    firstConnectBox.showModal();

    function handleOptionClicked(e){
        if(this.classList.contains("audio-accept")){
            localStorage.setItem("isAudioEnabled", true);
        } else {
            localStorage.setItem("isAudioEnabled", false);
        }

        audioAccept.removeEventListener("click", handleOptionClicked);
        audioDeny.removeEventListener("click", handleOptionClicked);
        localStorage.setItem("isFirstConnect", false);
        firstConnectBox.close();
        generateGifts();
    }

}


export default handleFirstConnect