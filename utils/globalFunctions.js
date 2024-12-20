import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const shuffle = (originalArray) => {
    const array = [...originalArray];
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1)); //i + 1 to include the last array element
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