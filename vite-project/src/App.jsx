import { useState } from "react";
import "./App.css";
import Notes from "./Notes.jsx";

const getRandomColor = () => {
  const letters = "89ABCDEF"; 
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 8)];
  }
  return color;
};


function App() {
  const [notes, setNotes] = useState([
    { id: 1, text: "TypeScript assignment", color: getRandomColor() },
    { id: 2, text: "complete the Redux assignment", color: getRandomColor() },
    { id: 3, text: "work on the personal Project", color: getRandomColor() },
    { id: 4, text: "Dont forget drink water", color: getRandomColor() },
    { id: 5, text: "note 5", color: getRandomColor() },
  ]);

  const [newNote, setNewNote] = useState("");

  const handleChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNote.trim()) {
      const newNoteObject = {
        id: notes.length + 1,
        text: newNote,
        color: getRandomColor(),
      };
      setNotes([...notes, newNoteObject]);
      setNewNote("");
    }
  };

  return (
    <>
      <h1>Note App</h1>
      <div className="inpDiv">
        <input
          type="text"
          name="note"
          id="note"
          value={newNote}
          onChange={handleChange}
          placeholder="Add Note"
        />
        <button onClick={handleSubmit}>Add</button>
      </div>
      <Notes notes={notes} setNotes={setNotes} />
    </>
  );
}

export default App;
