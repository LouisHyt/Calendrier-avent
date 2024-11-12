// Import Styles
import './styles/dialogBox.css'
import './styles/buttons.css'
import './styles/settings-infos.css'

//Import utils functions
import handleSettings from './utils/handleSettings'
import handleInfos from './utils/handleInfos'
import initLocalStorage from './utils/initLocalStorage'

initLocalStorage();
handleSettings();
handleInfos();

const dialogBox = document.querySelector('.dialog-box');




