const nodemailer = require('nodemailer');
const shoutoutButton = document.getElementById("submit-shoutout");

let transporter = nodemailer.createTransport(transport[defaults])

console.log("hi");

function youClicked() {
    console.log("You clicked!");
}

shoutoutButton.addEventListener("click", youClicked);