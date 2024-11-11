import openDialog from "./openDialog";

const handleSettings = () => {
    const openSettingsButton = document.querySelector(".open-settings");
    const closeSettingsButton = document.querySelector(".close-settings");
    const dialogSettings = document.querySelector("dialog.settings");

    const resetProgression = document.querySelector("button.reset-all");
    const confirmReset = resetProgression.querySelector(".confirm-reset");
    const unlockProgression = document.querySelector("button.unlock-all");

    const callSantaClaus = document.querySelector("button.santaclaus-info");

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

    callSantaClaus.addEventListener("click", () => {
        openDialog([
            ["Quoi ? On m'appelle ? Je suppose que tu veux un <strong>fun fact</strong> !"],
            ["Hmmm finalement je n'en ai aucun. Reviens une prochaine fois !"],
            ["Enfin jespère..."]
        ])
    })
}

export default handleSettings