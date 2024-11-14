// Import Styles
import './styles/dialogBox.css'
import './styles/buttons.css'
import './styles/settings-infos.css'
import './styles/calendar.css'
import './styles/firstConnect.css'

//Import utils functions
import handleFirstConnect from './utils/handleFirstConnect'
import handleSettings from './utils/handleSettings'
import handleInfos from './utils/handleInfos'
import initLocalStorage from './utils/initLocalStorage'
import generateGifts from "./utils/generateGifts"

initLocalStorage();
handleSettings();
handleInfos();

const isFirstConnect = JSON.parse(localStorage.getItem("isFirstConnect"));
isFirstConnect !== false 
    ? handleFirstConnect()
    : generateGifts();






