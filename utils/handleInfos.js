import openDialog from "./openDialog";

const handleInfos = () => {

   const closeInfosButton = document.querySelector(".close-infos");
   const openInfosButton = document.querySelector(".open-infos");
   const dialogInfos = document.querySelector("dialog.infos");

   openInfosButton.addEventListener("click", () => {
        const tabOpened = JSON.parse(localStorage.getItem("tabOpened"));
        if(!tabOpened.includes("infos")){
            tabOpened.push("infos");
            localStorage.setItem("tabOpened", JSON.stringify(tabOpened));
            dialogInfos.addEventListener("transitionend", handleInfosTransition)
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