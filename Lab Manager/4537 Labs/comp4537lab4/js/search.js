function searchDefinition() {
    const searchTerm = document.getElementById('word-input').value.trim();

    if (!searchTerm) {
        document.getElementById('feedback').innerText = strings.pleaseEnterSearchTerm;
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://lab4-hv19.onrender.com/search?term=' + encodeURIComponent(searchTerm), true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                if (response.word === searchTerm) {
                    document.getElementById('definition').innerText = response.definition;
                    document.getElementById('feedback').innerHTML = `${strings.successfullyFoundDefinition}${response.totalEntries}, Total requests: ${response.totalRequests}`;
                } else {
                    document.getElementById('feedback').innerText = strings.wordNotFound;
                    document.getElementById('definition').innerText = '';
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
                document.getElementById('feedback').innerText = strings.errorParsingJSON;
            }
        } else {
            document.getElementById('feedback').innerText = strings.failedToPerformSearch;
            document.getElementById('definition').innerText = '';
        }
    };
    
    xhr.onerror = function () {
        document.getElementById('feedback').innerText = strings.networkError;
        document.getElementById('definition').innerText = '';
    };
    xhr.send();
}
