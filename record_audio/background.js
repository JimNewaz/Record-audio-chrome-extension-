// chrome.runtime.onInstalled.addListener(function () {
//     chrome.tabs.create({
//         url: 'mailto:team@nat.app?subject=My%20first%20audio%20message!%20&body=Hey%2C%20%0D%0A%0D%0ATry%20the%20extension%20out%20and%20send%20your%20first%20audio%20message!%20You%20just%20need%20to%20click%20on%20the%20button%20on%20the%20bottom%20right!',
//         active: true
//     });
    
//     return false;
// });

chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = "https://contacts.google.com/";
    chrome.windows.create({url: newURL, 'type': 'popup', focused: true });
});