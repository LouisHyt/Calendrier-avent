const initLocalStorage = () => {
    const enableAudioInput = document.querySelector("#enableAudio");
    const audioVolumeInput = document.querySelector("#audioVolume");
    const volumeInfo = document.querySelector("#audioVolume + .volume-info");

    const isAudioEnabled = localStorage.getItem("isAudioEnabled");
    const audioVolume = parseFloat(localStorage.getItem("audioVolume"));

    if(isAudioEnabled){
        enableAudioInput.checked = JSON.parse(isAudioEnabled);
    } else {
        localStorage.setItem("isAudioEnabled", false);
        enableAudioInput.checked = false;
    }

    if(audioVolume){
        volumeInfo.textContent = `${audioVolume * 100}%`;
        audioVolumeInput.value = audioVolume;
    } else {
        localStorage.setItem("audioVolume", 0.7);
        audioVolumeInput.value = audioVolume;
        volumeInfo.textContent = "70%";
    }

}






export default initLocalStorage