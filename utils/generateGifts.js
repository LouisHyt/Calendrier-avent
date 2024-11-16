import { shuffle } from "./globalFunctions";
import openGiftScreen from "./openGiftScreen";

const generateGifts = async () => {

    const calendar = document.querySelector("#calendar");

    const response = await fetch("/assets/jsons/daily_gifts.json")
    const parsedResponse = await response.json();
    const dailyGifts = shuffle(parsedResponse);

    const startingMonth = 11;
    const startingYear = 2024;
    const currentDate = new Date().getTime();

    
    for(const [index, dailyGift] of dailyGifts.entries()){


        const availableDate = new Date(`${startingMonth}/${dailyGift.id}/${startingYear}`);
        let isLocked = currentDate >= availableDate ? false : true;

        const giftsOpened = JSON.parse(localStorage.getItem("giftsOpened"));
        const isNew = !isLocked && !giftsOpened.includes(dailyGift.id);

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

    //Handling close gift screen
    const closeGift = document.querySelector(".close-gift");
    const giftScreen = document.querySelector(".gift-screen");
    closeGift.addEventListener("click", () => {
        giftScreen.close();
    })
    
    function handleGiftClick(e){
        const giftID = parseInt(e.currentTarget.dataset.id);
        const giftsOpened = JSON.parse(localStorage.getItem("giftsOpened"));
        if(!giftsOpened.includes(giftID)){
            giftsOpened.push(giftID);
            localStorage.setItem("giftsOpened", JSON.stringify(giftsOpened));
            e.currentTarget.setAttribute("data-is-new", false);
        }
        const clickedGift = dailyGifts.find(gift => gift.id == giftID);
        openGiftScreen(clickedGift)
    }

}

export default generateGifts