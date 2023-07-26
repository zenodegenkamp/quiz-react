import React from 'react'
import {decode} from 'html-entities';


export default function Questions(){

    const [questions, setQuestions] = React.useState([])
    const [currentlyChecked, setCurrentlyChecked] = React.useState("notChecked");

    React.useEffect(() => {
      getQuestions();
    }, []);

    async function getQuestions() {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=5");
        const data = await response.json();

        setQuestions((prevQuestions) => {
          return [
            ...prevQuestions,
            ...data.results.map((result) => {
              console.log(result);
              const newArray = result.incorrect_answers.toSpliced(
                Math.floor(Math.random() * 4),
                0,
                result.correct_answer
              );

              return {
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
        console.error(`ERROR ${error}`);
      }
    }

    function handleChange(event) {
      questions.forEach((question, index) => {
        console.log(event.target.name)
        if (question.question === event.target.name) {
          setQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[index].chosenAnswer = event.target.value;

            return updatedQuestions;
          });
        }
      });
    }

    function checkAnswers(status) {
      setCurrentlyChecked(status)
    }
      
      
      let correctAnswersNumber = 0;
      const checkedArrayHTML = questions.map((question) => {
        return (
          <div className='quiz-section'>
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
                  checked=true

                  correctAnswersNumber += 1
                } else if (item === question.correctAnswer){
                  
                  classNameQuestion = "correctNotChosen"
                }
                else if (item === question.chosenAnswer) {
                  classNameQuestion = "incorrect";
                  checked=true
                
                } else {
                  classNameQuestion = "normal";
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
                    <label className={`radio-label ${classNameQuestion}`} htmlFor={item}>
                      {item}
                    </label>
                  
                  </React.Fragment>
                );
              })}
            </form>
          </div>
          
        )
      }
      
      )
    
      
        const newArrayHTML = questions.map((question) => {
            
                return (
                  <div className='quiz-section'>
                    <h1>{question.question}</h1>
                    <form>
                      {question.allAnswers.map((item) => {
                        return (
                          <React.Fragment key={item}>
                            <input
                              className="radio"
                              type="radio"
                              id={item}
                              name={question.question}
                              value={item}
                              onChange={handleChange}
                            />
                            <label className={'radio-label'} htmlFor={item}>{item}</label>
                          </React.Fragment>
                        );
                      })}
                    </form>
                  </div>
                );
                
                
                })


        let questionHtml = ""
        let button = ""
        if (currentlyChecked === "notChecked") {
          console.log("not Checked")
          questionHtml = questions.map((question) => {
            return (
              <div className="quiz-section">
                <h1>{question.question}</h1>
                <form>
                  {question.allAnswers.map((item) => {
                    return (
                      <React.Fragment key={item}>
                        <input
                          className="radio"
                          type="radio"
                          id={item}
                          name={question.question}
                          value={item}
                          onChange={handleChange}
                        />
                        <label className={"radio-label"} htmlFor={item}>
                          {item}
                        </label>
                      </React.Fragment>
                    );
                  })}
                </form>
              </div>
            )
          })

          button = <button className="check-btn" onClick={() => checkAnswers("checked")}>Check answers</button>

          
        } else if (currentlyChecked === "checked") {
          console.log("checked")
          let correctAnswersNumber = 0;
          questionHtml = questions.map((question) => {
            return (
              <div className='quiz-section'>
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
                      checked=true
    
                      correctAnswersNumber += 1
                    } else if (item === question.correctAnswer){
                      
                      classNameQuestion = "correctNotChosen"
                    }
                    else if (item === question.chosenAnswer) {
                      classNameQuestion = "incorrect";
                      checked=true
                    
                    } else {
                      classNameQuestion = "normal";
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
                        <label className={`radio-label ${classNameQuestion}`} htmlFor={item}>
                          {item}
                        </label>
                      
                      </React.Fragment>
                    );
                  })}
                </form>
              </div>
              
            )
          }
          
          )

          button = <button className="check-btn" onClick={() => checkAnswers("final")}>Show my performance</button>
        
        } else if (currentlyChecked === "final") {

          if (correctAnswersNumber > 2) {
            questionHtml = (
              <div className="quiz-section">
                <div className='scoreboardGreen'> {correctAnswersNumber}/5</div>
                <h1> Congratulations, space traveler!</h1>
                <p>
                  Congratulations, space traveler! You've completed the Space
                  Quiz. Do you have what it takes to return to Earth, or
                  will you venture out for another challenge?
                </p>
              </div>
            )

            button = <button className="check-btn" onClick={() => checkAnswers("final")}>Let's GO!</button>
            
          } else {
            questionHtml = (
              <div className="start-screen">
                  <div className='scoreboardRed'> {correctAnswersNumber}/5</div>
                  <h1>Don't give up, space voyager. </h1>
                  <p>
                  The stars aren't ready to allow you back to Earth just yet. 
                  Give it another try and expand your knowledge. 
                  You can do it!"
                  </p>
                </div>
            )

            button = <button className="check-btn" onClick={() => checkAnswers("final")}>Let's GO!</button>
          }
          
        }
           
        
        
    return (
        <div className="quiz-screen">
          <div className='questions-section'>
              {questionHtml}
              {button}
          </div>
          
        </div>
    )
}



