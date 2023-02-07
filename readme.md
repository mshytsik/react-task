# Task #7.1. React

## Pre Requirements

- Participating lecture
- Basic knowledge of React
- Basic knowledge of Redux

## Requirements

See repo. It contains a React application template which can be used. Pull code by clining/forking, add necessary changes and push to review.

### Basic Requirements

In this task you will need to create a book of recipes.

Basic functionality:

- See a list of all recipes, containing following:
  - Name;
  - Tags (like "Pizza", "Seefood");
  - Country.
- Filtering/searching by:
  - Name;
  - Tags;
  - Countries.
- See a detailed view of selected recipe, which contains:
  - Name;
  - Tags;
  - Country (with flag as icon or image);
  - Preparation instructions (detailed list of steps);
  - List of indredients;
  - Image (if attached);
  - Video (if attached).
- Add new recipe manually;
- Edit any added recipes, including attached images, videos.

## Extended Requirements

Add following functionality:

- Add new recipe from internet using [this API (it's free)](https://www.themealdb.com/api.php), allowing the following:
  - Searching by:
    - Category;
    - Random meal;
    - Ingredients;
    - Coutry.
  - Editing before saving.
- Edit any added recipes (both manually and automatically added), including attached images, videos.

## Super-Extended Requirements

Try to use Local Storage to preserve state of your recipes book when closing/opening browser.

## Additional Notes

- Feel free to use any npm libraries on your taste;
- All actions performed to the app should go through and kept under Redux Store;
- The main goal is fully working functionality, custom styling is acceptable and highly appreciated;
- Prevent users from getting into an “unexpected” state (validate user inputs, like setting quantity to negative values and so on);

## Rating criterias

- 5 – Task is completed, the solution is clean, readable and reliable. React/Redux rules are followed. Extender Requirements are met.
- 4 – Task is completed, the solution is clean, readable and reliable. React/Redux rules are followed.
- 3 – Task is completed, edge cases missing, code is readable, but has some gaps in reliability.
- 2 – Partial completion of the tasks, functionality doesn’t fully work or fail on some usual cases.
- 1 – Partial completion of the tasks, unable to run, test.
- 0 – No completion or no submission.
