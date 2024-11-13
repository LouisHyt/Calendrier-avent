import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}

export const highlightElement = (element) => {

    const dialogBox = document.querySelector(".dialog-box");

    const config = {
        stagePadding: 20,
        allowKeyboardControl: false,
        disableActiveInteraction: true,
        showProgress: false,
        onHighlightStarted: () => {
            dialogBox.classList.add("driver-active");
        }
    }

    const driverObj  = driver(config);
    driverObj.highlight({
      element,
    });

}

export const disableHighlight = () => {

    const dialogBox = document.querySelector(".dialog-box");

    const driverObj  = driver();

    driverObj.destroy();
    dialogBox.classList.remove("driver-active");

}