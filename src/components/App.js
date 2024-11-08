import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState('List')
  useEffect(() =>{
    fetch('http://localhost:4000/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
  },[])
  function addQuestion(newQuestion){
    setQuestions([...questions, newQuestion])
  }
  function deleteQuestion(id){
    setQuestions(questions.filter((question) => question.id !== id));
  }
  function updateQuestion(updatedQuestion){
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={addQuestion}/> 
        ): (
        <QuestionList questions={questions} onDeleteQuestion={deleteQuestion} onUpdateQuestion={updateQuestion}  />
      )}
    </main>
  );
}

export default App;