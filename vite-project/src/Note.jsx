import { forwardRef } from "react";

const Note = forwardRef(
  ({ note, initialPosition = { x: 0, y: 0 }, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className="note"
        style={{
          position: "absolute",
          left: `${initialPosition.x}px`,
          top: `${initialPosition.y}px`,
          padding: "10px",
          border: "1px solid black",
          userSelect: "none",
          width: "200px",
          height: "100px",
          cursor: "move",
          backgroundColor: note.color,
        }}
        {...props}
      >
        📌<p>{note.text}</p>
      </div>
    );
  }
);

export default Note;
