// content.js
let unfollowButtonText = "Following";
let unfollowConfirmationText = "Unfollow";
let selector = `button:contains('${unfollowButtonText}')`;
let unfollowButtons = $(selector);
let totalUnfollowButtons = unfollowButtons.length;

const delayBetweenUnfollows = 60 * 1000; // 1 minute in milliseconds

if (!totalUnfollowButtons) {
    // Send a message to the popup to display the alert
    chrome.runtime.sendMessage({ action: "noFollowingButtons" });
}

function unfollowUser(index) {
    if (index >= totalUnfollowButtons) {
        console.log("Script finished successfully!");
        return;
    }

    let button = $(unfollowButtons[index]);

    console.log(`Unfollowing ${index + 1} of ${totalUnfollowButtons}`);

    button.trigger("click");

    // Important: recently, a confirmation dialog was added when you click
    // on unfollow, so simply click the confirmation button as well to unfollow the user
    setTimeout(function () {
        var btn = $(`button:contains('${unfollowConfirmationText}')`);

        if (btn) {
            btn.trigger("click");
        }

        setTimeout(function () {
            unfollowUser(index + 1); // Continue unfollowing
        }, delayBetweenUnfollows);
    }, delayBetweenUnfollows);
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "startUnfollow") {
        // Start the unfollow loop
        unfollowUser(0);
    }
});
