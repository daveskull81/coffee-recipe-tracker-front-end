import React from 'react';

const Notes = ({ notes }) => {
  return (
    <>
      -----
      <h3>Notes:</h3>
      {notes.map(note => <p>{note.text}</p>)}
    </>
  );
}

export default Notes;
