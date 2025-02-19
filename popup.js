document.getElementById("pasteButton").addEventListener("click", () => {
    const textToPaste = document.getElementById("clipboardText").value;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: paste,
            args: [textToPaste]
        });
    });
});

function paste(text) {
    const activeElement = document.activeElement;
    
    if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
        activeElement.value += text;
    } else if (document.execCommand) {
        document.execCommand("insertText", false, text);
    }
}
