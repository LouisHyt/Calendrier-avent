// Import Styles
import './styles/dialogBox.css'
import './styles/buttons.css'
import './styles/settings-infos.css'
import './styles/calendar.css'

//Import utils functions
import handleSettings from './utils/handleSettings'
import handleInfos from './utils/handleInfos'
import initLocalStorage from './utils/initLocalStorage'
import generateGifts from "./utils/generateGifts"

initLocalStorage();
handleSettings();
handleInfos();
generateGifts();

const dialogBox = document.querySelector('.dialog-box');




