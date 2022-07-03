
//=========================================================================================================
// Initialization
//
//
//=========================================================================================================

const search = document.querySelector("#search");
const matchList = document.querySelector("#match-list");

search.addEventListener("input", () => searchAcronym(search.value));  

//=========================================================================================================
// searchAcronym()
// Search Acronym.json and filter it
//
//=========================================================================================================

const searchAcronym = async (searchText) => {

    const res = await fetch('./acronym.json');
    const acronyms = await res.json();

    // get matches to current text input
    let matches = acronyms.filter(inputAcronym => {
        const regex = new RegExp(`^${searchText}`,'gi');
        return inputAcronym.acronym.match(regex);
    });

    // clear the matches array and output html if the searchText is empty
    // or there is no such acronym in the search file. 
    if(searchText.length === 0 || matches.length === 0){
        matches = [];
        matchList.innerHTML = "";
    }

    // output the matches in the html
    outputHtml(matches);
}

//=========================================================================================================
// outputHtml()
// Show the results in HTML
// Using map to produce array of HTML and then using join to turn into string
//
//=========================================================================================================

const outputHtml = (matches) => {
    if(matches.length > 0){
        const html = matches.map( match => `
            <div class="match-list-control">
                <h4>${match.acronym} - <span class="primary">${match.name}</span></h4>
            </div>
        `).join('');

        matchList.innerHTML = html;
    }
};
