import openDialog from "./openDialog";

const openGiftScreen = (gift) => {

    const giftScreen = document.querySelector(".gift-screen");

    const day = giftScreen.querySelector(".day");
    const propertyName = giftScreen.querySelector(".property-name");
    const propertyType = giftScreen.querySelector(".property-type");
    const descriptionText = giftScreen.querySelector(".description-text");
    const exampleCode = giftScreen.querySelector(".example-code");
    const externalLink = giftScreen.querySelector(".external-link");

    day.textContent = `Jour ${gift.id}`;
    propertyName.textContent = gift.property;
    propertyType.textContent = gift.category;
    descriptionText.innerHTML = gift.description;
    externalLink.setAttribute("href", gift.reference_link);

    exampleCode.innerHTML = "";
    const formattedCode = gift.example.join("\n");
    exampleCode.textContent = formattedCode;

    giftScreen.show();

}

export default openGiftScreen