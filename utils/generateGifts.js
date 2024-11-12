import { shuffle } from "./globalFunctions";

const generateGifts = async () => {

    const calendar = document.querySelector("#calendar");

    const response = await fetch("/assets/jsons/daily_gifts.json")
    const parsedResponse = await response.json();
    const dailyGifts = shuffle(parsedResponse);
    
    for(const dailyGift of dailyGifts){

        calendar.insertAdjacentHTML("beforeend", 
            `
            <div class="gift-item locked" data-id=${dailyGift.id} style="--hueRotate: ${Math.floor(Math.random() * 360)}deg">
                <img src="/assets/images/gift-full.webp"/>
            </div>
            `
        )
    }

}

export default generateGifts