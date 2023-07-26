# Cosmic Quiz

The Cosmic Quiz is a React application that presents users with a set of trivia questions fetched from an API. Users can answer the questions and check their performance at the end.

## Getting Started

To run the Cosmic Quiz application locally, follow these steps:

1. Clone the repository to your local machine.

2. Navigate to the project directory in the terminal.

3. Install the necessary dependencies by running:

```
npm install
```

4. Start the development server:

```
npm start
```

5. The application should now be running on `http://localhost:3000`. Open your web browser and navigate to this URL to view and interact with the Cosmic Quiz.

## How It Works

### Fetching Questions

- The Cosmic Quiz fetches trivia questions from the Open Trivia Database API (https://opentdb.com/api.php). It uses the `fetch` function to make a GET request to the API and retrieves a set of 5 random trivia questions.

- The questions and their possible answers are decoded using the `html-entities` library to handle any special characters or HTML entities in the data.

### User Interaction

- The user interface consists of a set of questions displayed one at a time. Each question is presented with multiple-choice options in the form of radio buttons.

- Users can select one option for each question by clicking on the corresponding radio button.

### Check Answers

- Once the user has answered all the questions, they can click the "Check answers" button to view their performance.

- The application checks the user's answers and displays the number of correct answers out of 5.

### Restart Game

- After checking the answers, the user has the option to restart the game by clicking the "Try again" button. This will reset the questions and allow the user to play again.

## Components

The application consists of the following main component:

### Main Component

- The `Main` component is the main entry point of the application.

- It uses React hooks to manage the application state, including the list of questions, the current status of the quiz (`notChecked`, `checked`, or `final`), and whether the user wants to restart the game.

- The `useEffect` hook is used to fetch the questions from the API when the component mounts and whenever the user chooses to restart the game.

- The component renders a set of questions based on the current status of the quiz. When the status is `notChecked`, it displays the questions with multiple-choice options. When the status is `checked`, it shows the correct and incorrect answers. When the status is `final`, it displays the user's performance.

## Key Points to Note

- The code uses the `map` function to render lists of questions and answer options. Each element in the list is assigned a unique `key` prop to satisfy React's requirement for list rendering.

- The `handleChange` function updates the user's selected answers in the state.

- The `checkAnswers` function updates the status of the quiz to trigger the rendering of the correct answers or the user's performance.

- The `restartGameFunction` function resets the state to restart the game.

## Dependencies

- React (v16.8.0 or higher)

- `html-entities` library for decoding HTML entities.

---

