document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("allowCopyPaste").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          function: () => {
            allowCopyAndPaste = function (e) {
              e.stopImmediatePropagation();
              return true;
            };
            document.addEventListener("copy", allowCopyAndPaste, true);
            document.addEventListener("paste", allowCopyAndPaste, true);
            document.addEventListener("onpaste", allowCopyAndPaste, true);
          },
        },
        (results) => {
          if (
            chrome.runtime.lastError ||
            !results ||
            !results[0] ||
            results[0].result === undefined
          ) {
            changeButtonColor("allowCopyPaste", "var(--error-color)");
          } else {
            changeButtonColor("allowCopyPaste", "var(--success-color)");
          }
        }
      );
    });
  });

  document.getElementById("allowRightClick").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          function: () => {
            function enableContextMenu(aggressive = false) {
              void (document.ondragstart = null);
              void (document.onselectstart = null);
              void (document.onclick = null);
              void (document.onmousedown = null);
              void (document.onmouseup = null);
              void (document.body.oncontextmenu = null);
              enableRightClickLight(document);
              if (aggressive) {
                enableRightClick(document);
                removeContextMenuOnAll("body");
                removeContextMenuOnAll("img");
                removeContextMenuOnAll("td");
              }
            }

            function removeContextMenuOnAll(tagName) {
              var elements = document.getElementsByTagName(tagName);
              for (var i = 0; i < elements.length; i++) {
                enableRightClick(elements[i]);
              }
            }

            function enableRightClickLight(el) {
              el || (el = document);
              el.addEventListener("contextmenu", bringBackDefault, true);
            }

            function enableRightClick(el) {
              el || (el = document);
              el.addEventListener("contextmenu", bringBackDefault, true);
              el.addEventListener("dragstart", bringBackDefault, true);
              el.addEventListener("selectstart", bringBackDefault, true);
              el.addEventListener("click", bringBackDefault, true);
              el.addEventListener("mousedown", bringBackDefault, true);
              el.addEventListener("mouseup", bringBackDefault, true);
            }

            function restoreRightClick(el) {
              el || (el = document);
              el.removeEventListener("contextmenu", bringBackDefault, true);
              el.removeEventListener("dragstart", bringBackDefault, true);
              el.removeEventListener("selectstart", bringBackDefault, true);
              el.removeEventListener("click", bringBackDefault, true);
              el.removeEventListener("mousedown", bringBackDefault, true);
              el.removeEventListener("mouseup", bringBackDefault, true);
            }
            function bringBackDefault(event) {
              event.returnValue = true;
              typeof event.stopPropagation === "function" &&
                event.stopPropagation();
              typeof event.cancelBubble === "function" && event.cancelBubble();
            }

            enableContextMenu();
          },
        },
        (results) => {
          if (chrome.runtime.lastError || !results) {
            changeButtonColor("allowRightClick", "var(--error-color)");
          } else {
            changeButtonColor("allowRightClick", "var(--success-color)");
          }
        }
      );
    });
  });

  document.getElementById("allowSelect").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          function: () => {
            let style = document.createElement("style");
            style.innerHTML = "*{ user-select: auto !important; }";
            document.body.appendChild(style);
          },
        },
        (results) => {
          if (chrome.runtime.lastError || !results) {
            changeButtonColor("allowSelect", "var(--error-color)");
          } else {
            changeButtonColor("allowSelect", "var(--success-color)");
          }
        }
      );
    });
  });

  function changeButtonColor(buttonId, color) {
    const button = document.getElementById(buttonId);
    button.style.transition = "background-color 0.7s";
    button.style.backgroundColor = color;
    button.addEventListener(
      "transitionend",
      () => {
        button.style.backgroundColor = "";
      },
      { once: true }
    );
  }
});
