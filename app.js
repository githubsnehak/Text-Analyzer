document.addEventListener('DOMContentLoaded', function () {
    const heading1 = document.getElementById('heading1');
    const itemContainer = document.getElementById('items_container');
    const heading2 = document.getElementById('heading2');
    const main1 = document.querySelector('.main1');
    const main2 = document.querySelector('.main2');
    const customTextarea = document.getElementById('custom-textarea');
    const customTextarea2 = document.getElementById('custom2-textarea');
    const proceedButton = document.querySelector('.proceed-btn');
    const resultTable = document.getElementById('result-table');
    const resultTable2 = document.getElementById('result2-table');
    const resultTableBody = document.getElementById('table-body');
    const resultTableBody2 = document.getElementById('table2-body');
   

    // Function to update result table and Fetch DictionaryApi on user input
    function updateResultTableWord() {
       
        const textareaValue = customTextarea.value;
        const charCount = textareaValue.length;
        const wordCount = textareaValue.split(/\s+/).filter(function (word) {
            return word.length > 0;
        }).length;

        // Display results in the table
        resultTableBody.innerHTML = '<tr><th class="charcontrast">Characters </th><th class="charcontrast">Words</th></tr><tr><td>' + charCount + '</td><td>' + wordCount + '</td></tr>';
        resultTable.style.display = 'table';

        //Fetch DictionaryApi
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${textareaValue}`)
            .then((value) => value.json()).then((value) => {
                const meanings = value[0].meanings;
                const phonetic = value[0].phonetics;


                itemContainer.innerHTML += `
            <div class="div-container" style="display: block;">
              <h2 class="div-heading">Definition:  <span class="div-content">${meanings[0].definitions[0].definition}</span></h2>
              <h2 class="div-heading">Parts of Speech:  <span class="div-content">${meanings[0].partOfSpeech}</span></h2>
              <h2 class="div-heading">Synonyms:   <span class="div-content">${meanings[0].synonyms.join(", ")}</span></h2>
              <h2 class="div-heading">Phonetics:  <span class="div-content">${phonetic.map((item) => item?.text)}</span></h2>

            </div>
                    `;
            })
    }

    //  Count characters and words, sentences and paragraphs, whitespaces and punctuation (excluding whitespaces)
    function updateResultTableParagraph() {
        const textareaValue2 = customTextarea2.value;
        
        const charCount2 = textareaValue2.length;
        const wordCount2 = textareaValue2.split(/\s+/).filter(function (word) {
            return word.length > 0;
        }).length;

        const sentenceCount = textareaValue2.split(/[.!?]+/).length - 1;
        const paragraphCount = textareaValue2.trim() ? textareaValue2.split(/\n\s*\n/).length : 0;
        const whitespaceCount = textareaValue2.split(/\s/).length - 1;
        const punctuationCount = textareaValue2.replace(/\s/g, '').replace(/[a-zA-Z0-9]/g, '').length;

        // Display results in the table
        resultTableBody2.innerHTML = '<tr><th>Characters</th><th>Words</th><th>Sentences</th><th>Paragraphs</th><th>Whitespaces</th><th>Punctuation</th></tr>' +
            '<tr><td>' + charCount2 + '</td><td>' + wordCount2 + '</td><td>' + sentenceCount + '</td><td>' + paragraphCount + '</td><td>' + whitespaceCount + '</td><td>' + punctuationCount + '</td></tr>';

        // Show or hide the result table based on textarea content
        resultTable2.style.display = (textareaValue2.trim() !== '') ? 'table' : 'none';
    }

    // Toggle visibility of "Proceed" button and result table and  based on textarea content
    customTextarea.addEventListener('input', function (e) {

        proceedButton.style.display = (customTextarea.value.trim() !== '') ? 'inline-block' : 'none';
        resultTable.style.display = (customTextarea.value.trim() !== '') ? 'table' : 'none';
        
        if(customTextarea.value.trim() === '') {
            itemContainer.innerHTML = '';
        }
        // Hide resultTable2 when text is erased
        resultTable2.style.display = 'none';
    });
    
    // Toggle visibility of result table2 based on textarea content
    customTextarea2.addEventListener('input', function () {
        updateResultTableParagraph();
    });

    //// Toggle visibility of result table based on "Proceed" button
    proceedButton.addEventListener('click', function (e) {
        updateResultTableWord();
    });


    // Event listener for Heading 1
    heading1.addEventListener('click', function () {
        heading1.classList.add('active');
        heading2.classList.remove('active');
        main1.style.display = 'block';
        main2.style.display = 'none';
    });

    // Event listener for Heading 2
    heading2.addEventListener('click', function () {
        heading2.classList.add('active');
        heading1.classList.remove('active');
        main2.style.display = 'block';
        main1.style.display = 'none';
    });

});
