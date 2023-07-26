import React from "react"
import { decode } from "html-entities"

export default function Main() {
  const [questions, setQuestions] = React.useState([])
  const [currentlyChecked, setCurrentlyChecked] = React.useState("notChecked")
  const [restartGame, setRestartGame] = React.useState(false)


  React.useEffect(() => {
    async function getQuestions() {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=5")
        const data = await response.json()
        
        setQuestions((prevQuestions) => {
          return [
            ...prevQuestions,
            ...data.results.map((result) => {
              
              const newArray = result.incorrect_answers.toSpliced(
                Math.floor(Math.random() * 4),
                0,
                result.correct_answer
              );

              return {
                key: decode(result.question),
                question: decode(result.question),
                correctAnswer: decode(result.correct_answer),
                wrongAnswers: result.incorrect_answers,
                allAnswers: newArray,
                chosenAnswer: "",
              };
            }),
          ];
        });
      } catch (error) {
        console.error(`ERROR ${error}`)
      }
    }
    getQuestions()

    return () => {}
  }, [restartGame])

  function handleChange(event) {
    questions.forEach((question, index) => {
      
      if (question.question === event.target.name) {
        setQuestions((prevQuestions) => {
          const updatedQuestions = [...prevQuestions]
          updatedQuestions[index].chosenAnswer = event.target.value

          return updatedQuestions
        })
      }
    })
  }

  function checkAnswers(status) {
    setCurrentlyChecked(status)
  }



  function restartGameFunction() {
    setQuestions([])
    setRestartGame((oldvalue) => {
      return !oldvalue
    })

    setCurrentlyChecked("notChecked");
  }

  
  let questionHtml = ""
  let button = ""
  
  if (currentlyChecked === "notChecked") {
    
    questionHtml = questions.map((question, index) => {
      return (
        <div className="quiz-section" key={index}>
          <h1>{question.question}</h1>
          <form>
            {question.allAnswers.map((item) => {
              return (
                <React.Fragment key={`${question.question}-${item}`}>
                  <input
                    className="radio"
                    type="radio"
                    id={`${question.question}-${item}`}
                    name={question.question}
                    value={item}
                    onChange={handleChange}
                  />
                  <label
                    className={"radio-label"}
                    htmlFor={`${question.question}-${item}`}
                  >
                    {item}
                  </label>
                </React.Fragment>
              )
            })}
          </form>
        </div>
      )
    })

    button = (
      <button className="check-btn" onClick={() => checkAnswers("checked")}>
        Check answers
      </button>
    )
  } else if (currentlyChecked === "checked") {
    
    questionHtml = questions.map((question, index) => {
      return (
        <div className="quiz-section" key={index}>
          <h1>{decode(question.question)}</h1>
          <form>
            {question.allAnswers.map((item) => {
              let classNameQuestion = ""
              let checked = false
              if (
                item === question.chosenAnswer &&
                item === question.correctAnswer
              ) {
                classNameQuestion = "correct"
                checked = true

              
              } else if (item === question.correctAnswer) {
                classNameQuestion = "correctNotChosen"
              } else if (item === question.chosenAnswer) {
                classNameQuestion = "incorrect"
                checked = true
              } else {
                classNameQuestion = "normal"
              }

              return (
                <React.Fragment key={item}>
                  <input
                    className="radio"
                    type="radio"
                    id={item}
                    name={decode(question.question)}
                    value={item}
                    onChange={handleChange}
                    checked={checked}
                  />
                  <label
                    className={`radio-label ${classNameQuestion}`}
                    htmlFor={item}
                  >
                    {item}
                  </label>
                </React.Fragment>
              )
            })}
          </form>
        </div>
      )
    })

    button = (
      <button className="check-btn" onClick={() => checkAnswers("final")}>
        Show my performance
      </button>
    )
  } else if (currentlyChecked === "final") {
    
    let correctAnswersCount = 0
    
      correctAnswersCount = questions.reduce((count, question) => {
        if (question.chosenAnswer === question.correctAnswer) {
          return count + 1
        }
        return count
      }, 0)
    
    
    if (correctAnswersCount > 2) {
      questionHtml = (
        <div className="start-screen">
          <div className="scoreboardGreen"> {correctAnswersCount}/5</div>
          <h1> Congratulations, space traveler!</h1>
          <p>
            Your stellar performance in the cosmic quiz has earned you the
            ticket back to Earth.
          </p>
        </div>
      )
      
    } else {
      questionHtml = (
        <div className="start-screen">
          <div className="scoreboardRed"> {correctAnswersCount}/5</div>
          <h1>Don't give up, space voyager. </h1>
          <p>
            Although you didn't secure your return to Earth this time, fear not.
            The mysteries of the cosmos are vast, and there will be more
            opportunities to conquer them.
          </p>
        </div>
      )
      
      button = (
        <button className="check-btn" onClick={restartGameFunction}>
          Try again
        </button>
      )
      
    }
  }

  return (
    <div className="quiz-screen">
      <div className="questions-section">
        {questionHtml}
        {button}
      </div>
    </div>
  )
}
