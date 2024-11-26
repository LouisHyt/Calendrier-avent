const resetProgress = () => {

    localStorage.removeItem("giftsOpened");
    localStorage.removeItem("funFactsUnlocked");
    localStorage.removeItem("isFirstConnect");
    localStorage.removeItem("tabOpened");
    localStorage.removeItem("audioVolume");
    localStorage.removeItem("isAudioEnabled");
    localStorage.removeItem("bypassProgression");

}

export default resetProgress