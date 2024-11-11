const handleSettings = () => {
    const openSettingsButton = document.querySelector(".open-settings");
    const closeSettingsButton = document.querySelector(".close-settings");
    const dialogSettings = document.querySelector("dialog.settings");

    const resetProgression = document.querySelector("button.reset-all");
    const confirmReset = resetProgression.querySelector(".confirm-reset");
    const unlockProgression = document.querySelector("button.unlock-all");

    openSettingsButton.addEventListener("click", () => {
        dialogSettings.showModal();
    });

    closeSettingsButton.addEventListener("click", () => {
        dialogSettings.close();
    });

    resetProgression.addEventListener("click", () => {
        if(confirmReset.classList.contains("visible")){
            //Do stuff
            location.reload();
        } else {
            confirmReset.classList.add("visible");
        }
    })
}

export default handleSettings