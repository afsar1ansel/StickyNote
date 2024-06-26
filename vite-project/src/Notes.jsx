import { useEffect, useRef, createRef } from "react";
import Note from "./Note.jsx";

function Notes({ notes = [], setNotes = () => {} }) {
  const noteRefs = useRef({});
  console.log(notes)

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const updatedNotes = notes.map((note) => {
      if (!note || !note.id) return note;

      const storedNote = storedNotes.find((n) => n && n.id === note.id);
      if (storedNote && storedNote.position) {
        return {
          ...note,
          position: storedNote.position,
        };
      }
      if (!note.position) {
        const position = newPosition();
        return {
          ...note,
          position,
        };
      }
      return note;
    });

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }, [notes.length, setNotes]);

  const newPosition = () => {
    const maxTop = window.innerHeight - 250;
    const maxLeft = window.innerWidth - 250;
    return {
      x: Math.floor(Math.random() * maxLeft),
      y: Math.floor(Math.random() * maxTop),
    };
  };

  const handleDragStart = (note, e) => {
    const { id } = note;
    const noteRef = noteRefs.current[id].current;
    const rect = noteRef.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const startPos = note;
    const onMouseMove = (moveEvent) => {
      const newX = moveEvent.clientX - offsetX;
      const newY = moveEvent.clientY - offsetY;

      noteRef.style.left = `${newX}px`;
      noteRef.style.top = `${newY}px`;
    };

    const onMouseUp = (upEvent) => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      const finalPosition = noteRef.getBoundingClientRect();
      const newPosition = {
        x: finalPosition.left,
        y: finalPosition.top,
      };

      if (overLap(id)) {
        noteRef.style.left = `${startPos.position.x}px`;
        noteRef.style.top = `${startPos.position.y}px`;
      }else{
        updatePosition(id, newPosition);
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const overLap = (id) => {
    const currentNotRef = noteRefs.current[id].current;
    const rect = currentNotRef.getBoundingClientRect();

    return notes.some((note) => {
      if (note.id === id) return false;
      const noteRect =
        noteRefs.current[note.id].current.getBoundingClientRect();
      return (
        rect.top < noteRect.top + noteRect.height &&
        rect.top + rect.height > noteRect.top &&
        rect.left < noteRect.left + noteRect.width &&
        rect.left + rect.width > noteRect.left
      );
    });
  };

  const updatePosition = (id, newPosition) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, position: newPosition } : note
    );

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div>
      {notes.map((note) => {
        if (!noteRefs.current[note.id]) {
          noteRefs.current[note.id] = createRef();
        }
        return (
          <Note
            key={note.id}
            ref={noteRefs.current[note.id]}
            initialPosition={note.position}
            note={note}
            onMouseDown={(e) => handleDragStart(note, e)}
          />
        );
      })}
    </div>
  );
}

export default Notes;
