// Toggle the visibility of the Telugu or Hindi keyboard based on language selection
function toggleKeyboard() {
    const selectedLanguage = document.getElementById('select-language').value;
    const keyboard = document.getElementById('keyboard-button');
    const teluguKeyboard = document.getElementById('telugu-keyboard');
    const hindiKeyboard = document.getElementById('hindi-keyboard');
    const textarea = document.getElementById('input-text');

    // Hide both keyboards when switching languages
    teluguKeyboard.style.display = 'none';
    hindiKeyboard.style.display = 'none';
    textarea.value = '';  // Clears the input text
    if (selectedLanguage === 'telugu' || selectedLanguage === 'hindi') {
        keyboard.style.display = 'block'; // ensuring to show keyboard if lang is tel & hind
    } else {
        keyboard.style.display = 'none'; // Hide both keyboards when switching languages
    }
}

// Toggle the Telugu or Hindi keyboard visibility when the "Keyboard" button is clicked
function Keyboard() {
    const selectedLanguage = document.getElementById('select-language').value;
    const teluguKeyboard = document.getElementById('telugu-keyboard');
    const hindiKeyboard = document.getElementById('hindi-keyboard');
    
    if (selectedLanguage === 'english') {
        alert('Keyboard is not available for English.');
    }
    // Toggle Telugu keyboard visibility if Telugu is selected
    else if (selectedLanguage === 'telugu') {
        if (teluguKeyboard.style.display === "none") {
            teluguKeyboard.style.display = "block";
        } else {
            teluguKeyboard.style.display = "none";
        }
        // Ensure Hindi keyboard is hidden
        hindiKeyboard.style.display = "none";
    }
    // Toggle Hindi keyboard visibility if Hindi is selected
    else if (selectedLanguage === 'hindi') {
        if (hindiKeyboard.style.display === "none") {
            hindiKeyboard.style.display = "block";
        } else {
            hindiKeyboard.style.display = "none";
        }
        // Ensure Telugu keyboard is hidden
        teluguKeyboard.style.display = "none";
    }
}

// Add character based on the language selected (Telugu or Hindi)
let lastConsonantIndex = -1;
function addCharacter(character, type) {
    const textarea = document.getElementById('input-text');
    let currentText = textarea.value;
    
    if (type === 'consonant') {
        lastConsonantIndex = currentText.length;
    } 
    textarea.value = currentText + character;
}

function addSpace() {
    var inputField = document.getElementById('input-text');
    inputField.value += ' ';  // Add a space to the input text
}

function backSpace() {
    var inputField = document.getElementById('input-text');
    var currentText = inputField.value;
    inputField.value = currentText.slice(0, -1); // Remove the last character from the input text
}

// Add Gunintam (diacritic marks) based on language and rules (both Telugu and Hindi)
    function addGunintam(gunintam) {
        const textarea = document.getElementById('input-text');
        const currentText = textarea.value;
        const lastCharacter = currentText[currentText.length - 1];
    
        // Vowels for both languages
        const teluguVowels = ['అ', 'ఆ', 'ఇ', 'ఈ', 'ఉ', 'ఊ', 'ఋ', 'ఎ', 'ఏ', 'ఐ', 'ఒ', 'ఓ', 'ఔ'];
        const hindiVowels = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ'];
    
        // Check if the last character is a vowel
        if (teluguVowels.includes(lastCharacter) || hindiVowels.includes(lastCharacter)) {
            alert("Gunintam cannot be added after a vowel.");
            return; // Prevent adding Gunintam after a vowel
        }
    
        // Find the last consonant index
        let lastConsonantIndex = -1;
        for (let i = currentText.length - 1; i >= 0; i--) {
            if (!teluguVowels.includes(currentText[i]) && !hindiVowels.includes(currentText[i])) {
                lastConsonantIndex = i;
                break; // Found the last consonant
            }
        }
        if (lastConsonantIndex === -1) {
            return; // If no consonant found, do nothing
        }
        const newText = currentText.substring(0, lastConsonantIndex + 1) + gunintam + currentText.substring(lastConsonantIndex + 1);
        textarea.value = newText; // Add gunintam after the last consonant
    }

// Restrict input based on the selected language (Hindi, Telugu, or English)
function restrictInput() {
    const textarea = document.getElementById('input-text');
    let currentText = textarea.value;

    if (currentLanguage === 'telugu') {
        textarea.value = currentText.replace(/[a-zA-Z0-9]/g, ''); // Telugu restrict non-Telugu
    } else if (currentLanguage === 'hindi') {
        textarea.value = currentText.replace(/[a-zA-Z0-9]/g, ''); // Hindi restrict non-Hindi
    } else if (currentLanguage === 'english') {
        textarea.value = currentText.replace(/[^a-zA-Z0-9\s]/g, ''); // English restrict non-English
    }
}

// Translate text to Braille based on the selected language
function translateText() {
    const inputText = document.getElementById('input-text').value;
    let translatedText = '';
    const selectedLanguage = document.getElementById('select-language').value;

    if (selectedLanguage === 'english') {
        translatedText = translateToBraille(inputText, brailleMapEnglish);
    } else if (selectedLanguage === 'telugu') {
        translatedText = translateToBraille(inputText, teluguBraille);
    } else if (selectedLanguage === 'hindi') {
        translatedText = translateToBraille(inputText, hindiBraille); // Translate for Hindi
    }
    // Output the Braille translation
    document.getElementById('braille-translation').value = translatedText;
}

// Translate the text into Braille using a character map
function translateToBraille(text, brailleMap) {
    let brailleText = '';
    for (let char of text) {
        if (brailleMap[char]) {
            brailleText += brailleMap[char];
        } else {
            brailleText += ' '; // Undefined characters are returned as space
            //alert('Undefined characters are found.');
        }
    }
    return brailleText;
}

//func to display braille chart
    function displayBrailleCharts() {
        const brailleChartsContainer = document.getElementById('braille-charts');
    
        // Toggle visibility of the braille charts container
        if (brailleChartsContainer.style.display === 'none' || brailleChartsContainer.style.display === '') {
            // If the container is hidden, show it and generate the charts
            brailleChartsContainer.style.display = 'block';
            generateAllBrailleCharts();
        } else {
            // If the container is visible, hide it
            brailleChartsContainer.style.display = 'none';
        }
    }
    
    // Function to generate all Braille charts
    function generateAllBrailleCharts() {
        displayEnglishBrailleChart();
        displayTeluguBrailleChart();
        displayHindiBrailleChart();
    }

document.getElementById('instructions-button').addEventListener('click', function() {
    displayBrailleCharts();
});


function displayEnglishBrailleChart() {
    const container = document.getElementById('english-braille-chart');
    let htmlContent = '';
    let letters = [];
    let numbers = [];
    let punctuations = [];

    for (let char in brailleMapEnglish) {
        const brailleSymbol = brailleMapEnglish[char];
        if (/[a-zA-Z]/.test(char)) {
            letters.push({ char, braille: brailleSymbol });
        } else if (/[0-9]/.test(char)) {
            numbers.push({ char, braille: brailleSymbol });
        } else if (char.trim() !== '') {
            punctuations.push({ char, braille: brailleSymbol });
        }
    }

    // Helper func to create HTML for each category
    function createCategoryHTML(title, items) {
        let categoryHTML = `<div class="braille-category"><h4>${title}</h4><div class="braille-items">`;
        items.forEach(item => {
            categoryHTML += `
                <div class="braille-chart-item">
                    <div>${item.char}</div>
                    <div>${item.braille}</div>
                </div>
            `;
        });
        categoryHTML += `</div></div>`;
        return categoryHTML;
    }

    htmlContent += createCategoryHTML('Letters', letters);
    htmlContent += createCategoryHTML('Numbers', numbers);
    htmlContent += createCategoryHTML('Punctuations', punctuations);
    container.innerHTML = htmlContent;
}

function displayTeluguBrailleChart() {
    const container = document.getElementById('telugu-braille-chart');
    let htmlContent = '';
    let vowels = [];
    let consonants = [];
    let numbers = [];
    let signs = [];

    for (let char in teluguBraille) {
        const brailleSymbol = teluguBraille[char];
        if (['అ', 'ఆ', 'ఇ', 'ఈ', 'ఉ', 'ఊ', 'ఋ', 'ఎ', 'ఏ', 'ఐ', 'ఒ', 'ఓ', 'ఔ'].includes(char)) {
            vowels.push({ char, braille: brailleSymbol });
        } else if (/^[క-హ]$/.test(char) || char === 'క్ష' || char === 'ఱ') {
            consonants.push({ char, braille: brailleSymbol });
        } else if (/^[౦-౯]$/.test(char)) {
            numbers.push({ char, braille: brailleSymbol });
        } else if (char.trim()!== '') {
            signs.push({ char, braille: brailleSymbol });
        }
    }

    // Helper func to create HTML for each category
    function createCategoryHTML(title, items) {
        let categoryHTML = `<div class="braille-category"><h4>${title}</h4><div class="braille-items">`;
        items.forEach(item => {
            categoryHTML += `
                <div class="braille-chart-item">
                    <div>${item.char}</div>
                    <div>${item.braille}</div>
                </div>
            `;
        });
        categoryHTML += `</div></div>`;
        return categoryHTML;
    }
    htmlContent += createCategoryHTML('Vowels', vowels);
    htmlContent += createCategoryHTML('Consonants', consonants);
    htmlContent += createCategoryHTML('Numbers', numbers);
    htmlContent += createCategoryHTML('Signs', signs);
    container.innerHTML = htmlContent;
}

function displayHindiBrailleChart() {
    const container = document.getElementById('hindi-braille-chart');
    let htmlContent = '';
    let vowels = [];
    let consonants = [];
    let numbers = [];
    let vowelSigns = [];

    // Assuming you have a Hindi braille mapping similar to the others
    for (let char in hindiBraille) {
        const brailleSymbol = hindiBraille[char];
        if (['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ'].includes(char)) {
            vowels.push({ char, braille: brailleSymbol });
        } else if (/^[क-ह]$/.test(char) || char === 'क्ष' || char === 'ज्ञ') {
            consonants.push({ char, braille: brailleSymbol });
        } else if (/^[०-९]$/.test(char)) {
            numbers.push({ char, braille: brailleSymbol });
        } else if (char.trim() !== '') {
            vowelSigns.push({ char, braille: brailleSymbol });
        }
    }

    // Helper func to create HTML for each category
    function createCategoryHTML(title, items) {
        let categoryHTML = `<div class="braille-category"><h4>${title}</h4><div class="braille-items">`;
        items.forEach(item => {
            categoryHTML += `
                <div class="braille-chart-item">
                    <div>${item.char}</div>
                    <div>${item.braille}</div>
                </div>
            `;
        });
        categoryHTML += `</div></div>`;
        return categoryHTML;
    }

    htmlContent += createCategoryHTML('Vowels', vowels);
    htmlContent += createCategoryHTML('Consonants', consonants);
    htmlContent += createCategoryHTML('Numbers', numbers);
    htmlContent += createCategoryHTML('Vowel Signs', vowelSigns);
    container.innerHTML = htmlContent;
}

function clearText() {
    const textarea = document.getElementById('input-text');
    textarea.value = ''; // Clear the textarea
    document.getElementById('braille-translation').value = ''; // Clear the Braille translation output
}

function printTranslation() {
    const translationContent = document.getElementById("braille-translation").value;
    const newWindow = window.open("" /*"_blank"*/);
    newWindow.document.write("<h3>Braille Translation</h3>");
    newWindow.document.write(`<pre>${translationContent}</pre>`);
    newWindow.document.close();
    newWindow.print();
}

function speakText() {
        var text = document.getElementById('input-text').value;
        var language = document.getElementById('select-language').value;
        // Create a new SpeechSynthesisUtterance object
        var utterance = new SpeechSynthesisUtterance(text);
        
        utterance.lang = language;// Set the language dynamically based on the dropdown selection
        window.speechSynthesis.speak(utterance);// Speak the text
}
