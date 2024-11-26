import React, { useState } from "react";

const fetchQuestions = () => {
  return [
    {
      question: "What is 4 * 5?",
      expected_answer: "20",
    },
    {
      question: "What do I get if I add 99 to 2?",
      expected_answer: "101",
    },
    {
      question:
        "I have four apples, I get another eight from my father, but I share the apples equally with my friend. How many apples do I have?",
      expected_answer: "6",
    },
    {
      question: "If I count up from 997 as follows, what is the next number? 997, 998, 999, ...",
      expected_answer: "1000",
    },
    {
      question: "How much is 2 to the power 3 or 2^3?",
      expected_answer: "8",
    },
  ];
};

const QuizPage = () => {
  const [questions] = useState(fetchQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [completed, setCompleted] = useState(false);

  const answersApiUrl = "http://localhost:8100/api/validate-answer";

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();

    const currentQuestion = questions[currentQuestionIndex];
    const payload = {
        author_id: "27833335555",
        author_type: "OWNER",
        contact_uuid: "e331dc93-1b9a-4db4-ad58-315d1c95f243",
        message_direction: "inbound",
        message_id: "ABGGJ4MzZWFfAgs-sCaxu0X72jwgbg",
        message_body: userAnswer,
        question: currentQuestion.question,
        expected_answer: currentQuestion.expected_answer,
        message_inserted_at: new Date().toISOString(),
        message_updated_at: new Date().toISOString()
    };

    let data;

    try {
      const response = await fetch(answersApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        data = await response.json();
      } else {
        console.error("Server responded with an error:", response.status);
        if(currentQuestion.expected_answer===userAnswer){
            data = { result: "correct_answer" };
        } else {
            data = { result: "wrong_answer" };
        }
    }
    } catch (error) {
      console.error("Error fetching data from the server:", error);
      if(currentQuestion.expected_answer===userAnswer){
        data = { result: "correct_answer" };
      } else {
        data = { result: "wrong_answer" };
      }
    }

    switch (data.result) {
        case "correct_answer":
          setFeedback("Correct! Well done.");
          break;
        case "wrong_answer":
          setFeedback("Wrong answer. Try again next time!");
          break;
        case "stop":
          setFeedback("You chose to stop. Thank you for participating!");
          setCompleted(true);
          return;
        case "out_of_scope":
          setFeedback("The answer provided is out of scope.");
          break;
        default:
          setFeedback("Unexpected response from the server.");
          break;
      }

      // Move to the next question or finish
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setUserAnswer("");
      } else {
        setCompleted(true);
      }
  };

  if (completed) {
    return <div>Quiz completed! Thanks for participating.</div>;
  }

  return (
    <div>
      <h1>Math Quiz</h1>
      <p>{questions[currentQuestionIndex].question}</p>
      <form onSubmit={handleAnswerSubmit}>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your answer"
        />
        <button type="submit">Submit</button>
      </form>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default QuizPage;
