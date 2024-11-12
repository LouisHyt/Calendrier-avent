import openDialog from "./openDialog";

const handleSettings = () => {
    const openSettingsButton = document.querySelector(".open-settings");
    const closeSettingsButton = document.querySelector(".close-settings");
    const dialogSettings = document.querySelector("dialog.settings");

    const resetProgression = document.querySelector("button.reset-all");
    const confirmReset = resetProgression.querySelector(".confirm-reset");
    const unlockProgression = document.querySelector("button.unlock-all");

    const callSantaClaus = document.querySelector("button.santaclaus-info");

    const enableAudioInput = document.querySelector("#enableAudio");
    const audioVolumeInput = document.querySelector("#audioVolume");
    const volumeInfo = document.querySelector("#audioVolume + .volume-info");

    //Set localStoredValues

    openSettingsButton.addEventListener("click", () => {
        dialogSettings.showModal();
    });

    closeSettingsButton.addEventListener("click", () => {
        dialogSettings.close();
    });

    enableAudioInput.addEventListener("input", (e) => {
        localStorage.setItem("isAudioEnabled", e.target.checked);
    })

    audioVolumeInput.addEventListener("input", (e) => {
        localStorage.setItem("audioVolume", e.target.value);
        volumeInfo.textContent = `${e.target.value * 100}%`;
    })

    resetProgression.addEventListener("click", () => {
        if(confirmReset.classList.contains("visible")){
            //Do stuff
            location.reload();
        } else {
            confirmReset.classList.add("visible");
        }
    })

    callSantaClaus.addEventListener("click", async () => {

        const data = await fetch("/assets/jsons/dialogs/test.json")
        const jsonData = await data.json();
        openDialog(jsonData);
    })
}

export default handleSettings