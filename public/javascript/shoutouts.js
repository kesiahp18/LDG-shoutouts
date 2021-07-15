const shoutoutButton = document.getElementById("submit-shoutout");

console.log("hi");

function youClicked() {
    console.log("You clicked!");
}

shoutoutButton.addEventListener("click", youClicked);