import React from 'react'
import List from './List';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Board = () => {


  // This function will be called when a card is dropped
  const onDragEnd = (result) =>{
    // `result` contains info about the dragged item
    console.log(result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        <h2>My Board</h2>

        <Droppable droppableId="board" direction="horizontal" type="list">
          {(provided) => (
            <div
              className="list-container"
              ref={provided.innerRef}
              {...provided.droppableProps} 
            >
              <List title="To Do" listId="list-1" />
              <List title="In Progress" listId="list-2" />
              <List title="Done" listId="list-3" />
              {provided.placeholder}  
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Board
