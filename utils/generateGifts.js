import { shuffle } from "./globalFunctions";
import openGiftDialog from "./openGiftDialog";

const generateGifts = async () => {

    const calendar = document.querySelector("#calendar");

    const response = await fetch("/assets/jsons/daily_gifts.json")
    const parsedResponse = await response.json();
    const dailyGifts = shuffle(parsedResponse);
    const currentDate = Date.now();
    
    for(const [index, dailyGift] of dailyGifts.entries()){

        const startingMonth = 11;
        const startingYear = 2024; 

        const availableDate = new Date(`${startingMonth}/${dailyGift.id}/${startingYear}`).getTime();
        let isLocked = currentDate > availableDate ? false : true;

        calendar.insertAdjacentHTML("beforeend", 
            `
            <div 
                class="gift-item ${isLocked ? "locked": null}" 
                data-id=${dailyGift.id} 
                style="--hueRotate: ${Math.floor(Math.random() * 360)}deg; --i: ${index * 0.1}s"
            >
                <img src="/assets/images/gift-full.webp"/>
            </div>
            `
        )
    }

    const giftItems = document.querySelectorAll(".gift-item");
    for(const giftItem of giftItems){
        giftItem.addEventListener("click", handleGiftClick)
    }

    function handleGiftClick(e){
        const giftID = e.currentTarget.dataset.id;
        const giftOpened = JSON.parse(localStorage.getItem("giftOpened"));
        if(!giftOpened.includes(giftID)){
            giftOpened.push(giftID);
            localStorage.setItem("giftOpened", JSON.stringify(giftOpened));
        }
        const clickedGift = dailyGifts.find(gift => gift.id == giftID);
        openGiftDialog(clickedGift)
    }

}

export default generateGifts