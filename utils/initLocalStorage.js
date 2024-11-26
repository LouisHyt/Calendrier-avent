const initLocalStorage = () => {
    const enableAudioInput = document.querySelector("#enableAudio");
    const audioVolumeInput = document.querySelector("#audioVolume");
    const volumeInfo = document.querySelector("#audioVolume + .volume-info");

    const isAudioEnabled = localStorage.getItem("isAudioEnabled");
    const audioVolume = parseFloat(localStorage.getItem("audioVolume"));
    const giftsOpened = JSON.parse(localStorage.getItem("giftsOpened"));
    const tabOpened = JSON.parse(localStorage.getItem("tabOpened"));
    const funFactsUnlocked = JSON.parse(localStorage.getItem("funFactsUnlocked"));


    //Audio enable
    if(isAudioEnabled){
        enableAudioInput.checked = JSON.parse(isAudioEnabled);
    } else {
        localStorage.setItem("isAudioEnabled", false);
        enableAudioInput.checked = false;
    }

    //Audio Volume
    if(audioVolume){
        volumeInfo.textContent = `${audioVolume * 100}%`;
        audioVolumeInput.value = audioVolume;
    } else {
        localStorage.setItem("audioVolume", 0.7);
        audioVolumeInput.value = audioVolume;
        volumeInfo.textContent = "70%";
    }

    //Gift Opened
    if(!giftsOpened){
        localStorage.setItem("giftsOpened", JSON.stringify([]));
    }

    //All tabs opened
    if(!tabOpened){
        localStorage.setItem("tabOpened", JSON.stringify([]));
    }

    //Fun fact Unlocked
    if(!funFactsUnlocked){
        localStorage.setItem("funFactsUnlocked", JSON.stringify([]));
    }


}






export default initLocalStorage