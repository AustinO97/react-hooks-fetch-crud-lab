import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [question, setQuestion] = useState([])


  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(data => setQuestion(data))
  }, [])

  const handleDeleteClick = (deleteQuestion) => {
    fetch(`http://localhost:4000/questions/${deleteQuestion}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => {
      const updatedQuestion = question.filter((q) => q.id !== deleteQuestion)
      setQuestion(updatedQuestion)
    })
  }

  const handleUpdate = (correctIndex) => {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({correctIndex})
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = question.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuestion(updatedQuestions);
      });
  }

  const questionItems = question.map((q) => (
    <QuestionItem
      key={q.id}
      question={q}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleUpdate}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;