 import { useState } from "react";

function Quiz(){

    const questions = [  //set of questions
    {
      question: "Who is the G.O.A.T?",
      options: ["Ronaldo", "Messi", "Neymar"],
      Answer: "Ronaldo"
    },
    {
      question: "Which country won the 2018 World Cup?",
      options: ["France", "Brazil", "Argentina"],
      Answer: "France"
    },
    {
      question: "Which club has the most Champions League titles?",
      options: ["Bayern Munich", "AC Milan", "Real Madrid"],
      Answer: "Real Madrid"
    },
     
    {
      question: "Which player has the most international goals?",
      options: ["Ali Daei", "Cristiano Ronaldo", "Lionel Messi"],
      Answer: "Cristiano Ronaldo"
    }
  ];

  const[answer,setAnswer]=useState(null)    //for choosing the correct answer
  const[question,setQuestion]=useState(0)   //for moving to the next question
  const[score,setScore]=useState(0)         //to show the score
  const[,setShowResult]=useState(false)    //to show the result
  const[,setAnswered]=useState(false)  //to check if the question is already answered
  const[finish,setFinished]=useState(false)

  function correctAnswer(selectedOption){  
    if (answer !== null) return; // Prevent multiple answers
    setAnswer(selectedOption)  //for choosing the correct answer
    setAnswered(true)  //mark as answered

    if(selectedOption===questions[question].Answer){  //if the answer is correct
        setScore(score+1)  //the score will increase by 1
    }
  }


  function nextQuestion(){   //for moving to the question
    setAnswer(null) //to prevent showing the correct answer beforehand
    if (question<questions.length-1){  //if there are questions left
        setQuestion(question+1) //then we'll move on to the next question
        
    }
    else{
        setFinished(true)
        setShowResult(true)   //if there are no questions left, we'll show the result
        
    }
  }


  function restartGame(){  //to restart the game
    setQuestion(0)
    setAnswer(null)
    setScore(0)
    setShowResult(false)
    setAnswered(false)
  }

  if (finish){   //if the game is finished this will show up
    return(
      <div className="gameFinished">
         
        <h2>Quiz Completed!</h2>
        <p>Your score: {score}/{questions.length}</p>
         
         
       
      </div>
    )
  }


    return(
        <div className="quiz">
            <div className="quiz_cont">
               <h1>Quiz App</h1>

                

                <div className="questions">   
                    {questions[question].question}  
                </div>

                <div className="options">
                  {questions[question].options.map((option,index)=>{
                    const checkCorrect=option===questions[question].Answer  //checking if this is the correct answer
                    const isSelected=answer===option  //checking if the user selected this option
                    const wrongAnswer=answer && answer!==questions[question].Answer  //if there is an answer and the answer is wrong

                    let className=''
                    if(isSelected){
                      className=checkCorrect?'correct':'incorrect';
                    }else if(wrongAnswer && checkCorrect){   //if the user chooses the wrong answer and there is a correct answer
                      className='show-correct'   //the correct answer will be highlighted
                    }

                    return(
                      <li key={index} className={className} onClick={()=>correctAnswer(option)}>
                        {option}
                      </li>
                    )

                  })}
                </div>

                <div className="result">
                  <h3>Your scored {score} out of {questions.length}</h3>
                </div>

                <button onClick={nextQuestion}>Next</button>
                <button onClick={restartGame}>Reset</button>
                <div className="q_num">{question+1} out of {questions.length} questions</div>
            </div>

            

            
            
        </div>
    )

}
export default Quiz