const openGiftScreen = (gift) => {

    const giftScreen = document.querySelector(".gift-screen");

    const day = giftScreen.querySelector(".day");
    const propertyName = giftScreen.querySelector(".property-name");
    const propertyType = giftScreen.querySelector(".property-type");
    const descriptionText = giftScreen.querySelector(".description-text");
    const exampleExplanation = giftScreen.querySelector(".example-explanation");
    const exampleCode = giftScreen.querySelector(".example-code");
    const externalLink = giftScreen.querySelector(".external-link");

    day.textContent = `Jour ${gift.id}`;
    propertyName.textContent = gift.property;
    propertyType.textContent = gift.category;
    descriptionText.innerHTML = gift.description;
    exampleExplanation.textContent = gift.example_explanation;
    externalLink.setAttribute("href", gift.reference_link);

    exampleCode.innerHTML = "";
    for(const exampleLine of gift.example){
        exampleCode.insertAdjacentHTML('beforeend', `<p>${exampleLine}</p>`)
    }

    giftScreen.show();

}

export default openGiftScreen