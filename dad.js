// This website utilizes https://icanhazdadjoke.com/api to generate Dad jokes

// Call the API
const fetchJoke = async () => {

    // Use try for error checking
    try {
        const response = await fetch("https://icanhazdadjoke.com/", {
            headers: {
                Accept: "application/json"
            }
        });

        // If API cannot be reached throw an error
        if(!response.ok){
            const message = `Error: ${response.status}, ${response.statusText}`;
            const error = new Error(message);
            throw error;
        }

        const joke = await response.json();
        return joke;

    // Catch the error and log it to the console
    } catch (error) {
        console.error(`ERROR \n${error.message}`)
    }
};


//Page variable for different pages of jokes
let page = 1;
// Call the API 
const fetchJokePage = async () => {
    try {
        const response = await fetch("https://icanhazdadjoke.com/search?term=&page="+ `${page}`, {
            headers: {
                Accept: "application/json"
            }
        });


        if(!response.ok){
            const message = `Error: ${response.status}, ${response.statusText}`;
            const error = new Error(message);
            throw error;
        }

        const joke = await response.json();
        return joke;
    } catch (error) {
        console.error(`ERROR \n${error.message}`)
    }
};

// Query Selectors for the single joke 
let jokeSentence = document.querySelector("#joke");
let jokeButton = document.querySelector("#jokeButton");

// Query Selectors for the page of jokes 
let jokesParagraph = document.querySelector("#jokePage");
let jokePageButton = document.querySelector("#jokePageButton")

// Save the object and display the joke property as HTML
const renderJoke = () => {
    fetchJoke().then((jokeObject) => {
        jokeSentence.innerHTML = jokeObject.joke;
        // console.log(jokeObject);
        
    });
};

// Save the pages of jokes 
const renderJokePage = () => {
        
        // Ensure that API requests do not exceed page amount
        if (page < 20) {
        fetchJokePage().then((jokeObject) => {

            jokeObject.results.forEach((element) => {
                let li = document.createElement("li");
                li.innerText = element.joke;
                jokesParagraph.appendChild(li);
                jokesParagraph.appendChild(document.createElement("br"))

            })
        
        });
        page++;
    }
    else console.log("Exceeded click amount");
};

jokeButton.addEventListener("click", renderJoke);
jokePageButton.addEventListener("click", renderJokePage);

