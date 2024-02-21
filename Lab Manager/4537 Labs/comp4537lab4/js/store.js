function submitDefinition() {
    const word = document.getElementById('word-input').value.trim();
    const definition = document.getElementById('definition').value.trim();
    const xhr = new XMLHttpRequest();

    if (!word || !definition || !isNaN(word) || !isNaN(definition)) {
        document.getElementById('feedback').innerText = strings.pleaseEnterNonEmptyNonNumberValues;
        return;
    }

    xhr.open('POST', 'https://lab4-hv19.onrender.com/store-definition', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            document.getElementById('definition').innerText = response.definition;
            document.getElementById('feedback').innerText = `${strings.definitionSubmittedSuccessfully}${response.totalRequests}, total entries: ${response.totalEntries}`;
        } else if (xhr.status === 404) {
            document.getElementById('feedback').innerText = xhr.responseText;
        } else if (xhr.status === 400) {
            document.getElementById('feedback').innerText = strings.wordAlreadyExists;
        } else {
            document.getElementById('feedback').innerText = strings.failedToSubmitDefinition;
        }
    };
    
    xhr.onerror = function () {
        document.getElementById('feedback').innerText = strings.networkError;
    };

    xhr.send(JSON.stringify({ word: word, definition: definition }));
}
