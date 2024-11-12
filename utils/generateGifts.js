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

        const availableDate = new Date(`${startingMonth}/${dailyGift.id}/${startingYear}`);
        let isLocked = currentDate > availableDate.getTime() ? false : true;

        const giftOpened = JSON.parse(localStorage.getItem("giftOpened"));
        const isNew = !isLocked && !giftOpened.includes(dailyGift.id.toString());

        calendar.insertAdjacentHTML("beforeend", 
            `
            <div 
                class="gift-item ${isLocked ? "locked": null}" 
                data-id=${dailyGift.id}
                data-available-date=${availableDate.toLocaleDateString()}
                data-is-new=${isNew}
                style="--hueRotate: ${Math.floor(Math.random() * 360)}deg; --i: ${index * 0.1}s"
            >
                <span class="new-gift"> Nouveau !</span>
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
            e.currentTarget.setAttribute("data-is-new", false);
        }
        const clickedGift = dailyGifts.find(gift => gift.id == giftID);
        openGiftDialog(clickedGift)
    }

}

export default generateGifts