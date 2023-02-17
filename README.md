# Star Wars API for Bold Science

This was my first experience creating a React web app from scratch, which was actually a fun experience so I appreciate the opportunity to attack this. 

I installed axios to make HTTP requests from making asynchronous HTTP requests to swapi. Then I created a stateful component that fetches the data from the API and stores it in its state. Then I rendered out a table that displays all the data and used a search input to filter the results based on user input. I used the await keyword to wait for each resource to be fetched before merging the arrays into a single object.

To collect data from multiple pages within the API, I used the useState and useEffect hooks to manage state and handle API requests. The Characters, Planets, and Starships components sets the initial state of the characters array to an empty array using the useState hook. The useEffect hook is used to make the API request and repeats the process until there are no more pages left (nextPageUrl is null). 

I used basic CSS3 methods to style the page. Didn't go to heavy on the design aspect as I tried to keep it close to 2 hours of development and wanted to get this out to you before you were heading out for vacation. 

All in all, really enjoyed this assignment and hope to continue forward. Thanks!
