var currentPage = 0;
const totalHtmlFiles = 1;
function changePublication() {
	if (currentPage >= 0 && currentPage < totalHtmlFiles) {
		var currentPageUrl = document.getElementById("contentIFrame").src;
		currentPageUrl = currentPageUrl.substring(0, currentPageUrl.lastIndexOf("/") + 1);
		var nextPageUrl = currentPageUrl;
		if (currentPage !== 0)
			currentPageUrl = currentPageUrl + "publication-" + currentPage + ".html";
		else
			currentPageUrl = currentPageUrl + "publication" + ".html";
		document.getElementById("contentIFrame").src = currentPageUrl;
		if ((currentPage + 1) < totalHtmlFiles) {
			nextPageUrl = nextPageUrl + "publication-" + (currentPage + 1) + ".html";
			document.getElementById("dummyIFrame").src = nextPageUrl;
		}
	}
}
function showNextPage() {
	++currentPage;
	changePublication();
	showHideArrows();
}
function showPreviousPage() {
	--currentPage;
	changePublication();
	showHideArrows();
}
function showHideArrows() {
	if (currentPage === 0) {
		document.getElementsByClassName("prev")[0].style.visibility = "hidden";
	} else {
		document.getElementsByClassName("prev")[0].style.visibility = "visible";
	}
	if (currentPage === (totalHtmlFiles -1)) {
		document.getElementsByClassName("next")[0].style.visibility = "hidden";
	} else {
		document.getElementsByClassName("next")[0].style.visibility = "visible";
	}
}


/* === Resizer: match iframe height to its content so the outer page scrolls === */
function resizeIFrameToContent() {
  var iframe = document.getElementById("contentIFrame");
  if (!iframe) return;
  try {
    var doc = iframe.contentWindow.document;
    // Use the max of body/docEl heights
    var newH = Math.max(
      doc.body ? doc.body.scrollHeight : 0,
      doc.documentElement ? doc.documentElement.scrollHeight : 0
    );
    // Fallback if zero: use viewport height
    if (!newH || isNaN(newH)) newH = window.innerHeight;
    iframe.style.height = newH + "px";
  } catch (e) {
    // Cross-origin fallback: use viewport height
    iframe.style.height = window.innerHeight + "px";
  }
}

/* Hook loads and resizes */
window.addEventListener("load", function () {
  var iframe = document.getElementById("contentIFrame");
  if (iframe) {
    iframe.addEventListener("load", resizeIFrameToContent);
  }
  resizeIFrameToContent();
});
window.addEventListener("resize", resizeIFrameToContent);

/* If next/prev change the iframe.src, the 'load' event will fire and we will resize automatically. */
