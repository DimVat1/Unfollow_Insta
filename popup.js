// popup.js
document.getElementById("startUnfollow").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // Send a message to the content script to start unfollowing
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: startUnfollow
        });
    });
});

document.getElementById("openCustomLink").addEventListener("click", function () {
    // Open a specific link when the button is clicked
    chrome.tabs.create({ url: "https://example.com" });
});

function startUnfollow() {
    // Send a message to the content script to start unfollowing
    chrome.runtime.sendMessage({ action: "startUnfollow" });
}
