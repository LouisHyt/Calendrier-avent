import openDialog from "./openDialog";

const handleInfos = () => {

    const dialogInfos = document.querySelector("dialog.infos");
    const closeInfosButton = dialogInfos.querySelector(".close-infos");
    const giftCountInfo = dialogInfos.querySelector(".gifts-opened > .gift-count");
    const openInfosButton = document.querySelector(".open-infos");

   openInfosButton.addEventListener("click", () => {

        //Check if first time opening the tab
        const tabOpened = JSON.parse(localStorage.getItem("tabOpened"));
        if(!tabOpened.includes("infos")){
            tabOpened.push("infos");
            localStorage.setItem("tabOpened", JSON.stringify(tabOpened));
            dialogInfos.addEventListener("transitionend", handleInfosTransition)
        }

        // Check for gift count and success
        const giftsOpenedCount = JSON.parse(localStorage.getItem("giftsOpened")).length;
        giftCountInfo.textContent = giftsOpenedCount;

        if(giftsOpenedCount >= 5){
            const imagePart = dialogInfos.querySelector(".success-image > .santa-arm");
            imagePart.dataset.unlocked = true;
        }

        if(giftsOpenedCount >= 15){
            const imagePart = dialogInfos.querySelector(".success-image > .santa-body");
            imagePart.dataset.unlocked = true;
        }

        if(giftsOpenedCount === 24){
            const imagePart = dialogInfos.querySelector(".success-image > .santa-face");
            imagePart.dataset.unlocked = true;
        }

        dialogInfos.show();
    });

    closeInfosButton.addEventListener("click", () => {
        dialogInfos.close();
    });

    async function handleInfosTransition(){
        dialogInfos.removeEventListener("transitionend", handleInfosTransition);
        
        const data = await fetch("/assets/jsons/dialogs/infos_firstOpen.json")
        const jsonData = await data.json();
        openDialog(jsonData, {discrete: false});
    }

}

export default handleInfos