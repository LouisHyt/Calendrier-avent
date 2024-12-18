import { shuffle } from "./globalFunctions";
import resetProgress from "./resetProgress";
import openDialog from "./openDialog";

const handleSettings = () => {
    const openSettingsButton = document.querySelector(".open-settings");
    const closeSettingsButton = document.querySelector(".close-settings");
    const dialogSettings = document.querySelector("dialog.settings");

    const resetProgression = document.querySelector("button.reset-all");
    const confirmReset = resetProgression.querySelector(".confirm-reset");
    const unlockProgression = document.querySelector("button.unlock-all");
    const confirmUnlock = unlockProgression.querySelector(".confirm-unlock");

    const callSantaClaus = document.querySelector("button.santaclaus-info");

    const enableAudioInput = document.querySelector("#enableAudio");
    const audioVolumeInput = document.querySelector("#audioVolume");
    const volumeInfo = document.querySelector("#audioVolume + .volume-info");

    //Set localStoredValues

    openSettingsButton.addEventListener("click", () => {
        const tabOpened = JSON.parse(localStorage.getItem("tabOpened"));
        if(!tabOpened.includes("settings")){
            tabOpened.push("settings");
            localStorage.setItem("tabOpened", JSON.stringify(tabOpened));
            dialogSettings.addEventListener("transitionend", handleSettingsTransition)
        }
        confirmReset.classList.remove("visible");
        confirmUnlock.classList.remove("visible");
        dialogSettings.show();
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
            resetProgress();
            location.reload();
        } else {
            confirmReset.classList.add("visible");
        }
    })

    unlockProgression.addEventListener("click", () => {
        if(confirmUnlock.classList.contains("visible")){
            //Do stuff
            localStorage.setItem("bypassProgression", true);
            location.reload();
        } else {
            confirmUnlock.classList.add("visible");
        }
    })

    callSantaClaus.addEventListener("click", async () => {

        const data = await fetch("/assets/jsons/dialogs/settings_callSanta.json")
        const jsonData = await data.json();
        const funFactsUnlocked = JSON.parse(localStorage.getItem("funFactsUnlocked"));
        const filteredFunFacts = jsonData.filter(elem => !funFactsUnlocked.includes(elem.id));
        let randomFunFact;
        if(!filteredFunFacts.length){
            randomFunFact = jsonData.find(elem => elem.id === funFactsUnlocked[0]);
            const newFunFactsUnlocked = [funFactsUnlocked[0]];
            localStorage.setItem("funFactsUnlocked", JSON.stringify(newFunFactsUnlocked));
        } else {
            randomFunFact = shuffle(filteredFunFacts)[0];
            funFactsUnlocked.push(randomFunFact.id);
            localStorage.setItem("funFactsUnlocked", JSON.stringify(funFactsUnlocked));
        }
        openDialog(randomFunFact.sentences, {discrete: false, isSpecial: randomFunFact.isSpecial});
    })


    async function handleSettingsTransition() {
        dialogSettings.removeEventListener("transitionend", handleSettingsTransition);
        
        const data = await fetch("/assets/jsons/dialogs/settings_firstOpen.json")
        const jsonData = await data.json();

        openDialog(jsonData, {discrete: false});
    }
}

export default handleSettings