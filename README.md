# Swift - Frontend Internship Assignment

This repository contains the code for the responsive UI design of the frontend assignment task assigned to me by `Swift`.

All the data shown on the webpages is from the <a href="https://jsonplaceholder.typicode.com">JSONPlaceholder API</a>.

## Tools and technologies used:
- **ReactJS (Vite)** - for UI design
- **TailwindCSS** - for styling and responsive design
- **JSONPlaceholder API** - for data

## Structure of the web app

- The application consists of two main screens:
- **Profile Screen**: Contains the details of the first record from the users’ dummy api
- **Comments Dashboard**: Displays all the comments from the dummy api, this is the default home route

## Functionality of the web app:

### Profile Screen Functionalities:

- Loads the users' data from the dummy users api. Uses the first record from that. Profile section is non-editable.
- Includes a navigation button to go back to home page.

### Comments Screen Functionalities:
- **Data Population**: Dummy comments api provides 500 dummy comment records. I represented them as a paginated grid. 
- All the logic related to the selection of page and page size is custom-implemented by me.
- **Searching**: Implemented search logic for comments by name, email and the comment itself.
- **Sorting**: Implemented sorting based on Post ID, Name and Email.
- **Behavior**:
  - Initially, everything is unsorted, clicking on any type of sort sorts the data in ascending order of the names, clicking again will sort the data in descending order.
  - Sorting modes on each subsequent click cycle between no sort-> ascending -> descending-> no sort
  -  Sorting is active on only 1 column at a time.
-  When we refresh the page it persists the search, sort, page and page size filters.