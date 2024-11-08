import React from "react";

function QuestionItem({ question,onDeleteQuestion,onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete(){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
    })
      .then(() => onDeleteQuestion(id))
      .catch((error) => console.error("Delete Failed:",error))

  }
  function handleUpdate(event){
    const newCorrectIndex = parseInt(event.target.value);
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({correctIndex: newCorrectIndex}),
    })
      .then((res) => res.json())
      .then((onUpdatedQuestion) => onUpdateQuestion(onUpdatedQuestion));
  }
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdate}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;