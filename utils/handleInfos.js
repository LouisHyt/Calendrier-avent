const handleInfos = () => {

   const closeInfosButton = document.querySelector(".close-infos");
   const openInfosButton = document.querySelector(".open-infos");
   const dialogInfos = document.querySelector("dialog.infos");

   openInfosButton.addEventListener("click", () => {
        dialogInfos.show();
    });

    closeInfosButton.addEventListener("click", () => {
        dialogInfos.close();
    });

}

export default handleInfos