import './App.css';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const initialItems = [
  { id: "1", content: "Conteudo 1" },
  { id: "2", content: "Conteudo 2" },
  { id: "3", content: "Conteudo 3" },
  
]

const initialColumns = [
  {
    name: "To do",
    id: "123",
    items: initialItems,
  },
  {
    name: "Doing",
    id: "456",
    items: [],
  }
]

function App() {
  //eslint-disable-next-line
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result) => {
    console.log(result);
    var sourceColumnItems = columns[0].items;
    var draggedItem = {};

    for (var i in sourceColumnItems) {
      if (sourceColumnItems[i].id == result.draggableId) {
        draggedItem = sourceColumnItems[i];
      }
    }

    // Excluí o objeto arrastado.
    var filteredSourceColumnItems = sourceColumnItems.filter(
      (item) => item.id != result.draggableId
    );
    
    // Adicionar o mesmo na nova posição.
    filteredSourceColumnItems.splice(result.destination.index, 0, draggedItem);    

    // Mucar o state
    var columnsCopy = JSON.parse(JSON.stringify(columns));
    columnsCopy[0].items = filteredSourceColumnItems;
    setColumns(columnsCopy);
  }

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column, index) => (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1>{column.name}</h1>
            <Droppable  droppableId={column.id} index={index} key={column.id}>
                {(provided) => (
                    <>
                    <p>Key: {column.id}</p>
                    <div ref={provided.innerRef} style={{backgroundColor: "orange", width: 250, height: 500, padding: 10, margin: 10, borderRadius: 5}}>
                      {column.items.map((item, index) => (
                        <Draggable 
                          draggableId={item.id} 
                          index={index} 
                          key={item.id}>
                            {(provided) => (
                              <div 
                                {...provided.dragHandleProps}
                                {...provided.draggableProps} 
                                ref={provided.innerRef} 
                                style={{backgroundColor: "white", height: 60, borderRadius: 5, marginBottom: 5, ...provided.draggableProps.style }}>
                                {item.content}
                              </div>
                            )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>    
                    </>            
                )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
}

export default App;
