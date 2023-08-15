import './App.css';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Box, Button, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Navbar from './components/navbar';

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
  },
  {
    name: "Done",
    id: "789",
    items: [],
  }
]

function App() {  
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result) => {
    var sourceColumnItems = [];
    var destinationColumnItems = [];
    var draggedItem = {};

    var sourceColumnId = 0;
    var destinationColumnId = 0;

    for (var i in columns) {
      if (columns[i].id === result.source.droppableId) {
        sourceColumnItems = columns[i].items;
        sourceColumnId = i;
      } else if (columns[i].id === result.destination.droppableId) {
        destinationColumnItems = columns[i].items;
        destinationColumnId = i;
      }
    }

    //eslint-disable-next-line
    for (var i in sourceColumnItems) {
      if (sourceColumnItems[i].id === result.draggableId) {
        draggedItem = sourceColumnItems[i];
      }
    }
    
    // Excluí o objeto arrastado.
    var filteredSourceColumnItems = sourceColumnItems.filter(
      (item) => item.id !== result.draggableId
    );

    if (result.source.droppableId === result.destination.droppableId) {
      filteredSourceColumnItems.splice(result.destination.index, 0 , draggedItem);      
  
      // Mucar o state
      var columnsCopy = JSON.parse(JSON.stringify(columns));
      columnsCopy[sourceColumnId].items = filteredSourceColumnItems;
      setColumns(columnsCopy);
    } else {
      destinationColumnItems.splice(result.destination.index, 0, draggedItem);      
      
      // Mucar o state
      //eslint-disable-next-line
      var columnsCopy = JSON.parse(JSON.stringify(columns));
      columnsCopy[sourceColumnId].items = filteredSourceColumnItems;
      columnsCopy[destinationColumnId].items = destinationColumnItems;
      setColumns(columnsCopy);
    }
    
  }

  return (
    <Box height="100vh" sx={{backgroundImage: "linear-gradient(45deg, #8587f3 30%, #fd84ae 100%)"}}>
      <Navbar></Navbar>
      <Box display="flex" justifyContent="center">
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((column, index) => (
            <Box style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>              
              <Droppable droppableId={column.id} index={index} key={column.id}>
                  {(provided) => (
                    <Box style={{backgroundColor: "#101204", width: 250, height: "fit-content", padding: 10, margin: 10, borderRadius: 5}}>
                      <Typography variant='h6' sx={{color: "#FFF"}}>{column.name}</Typography>
                      <Box ref={provided.innerRef} width="100%" height="100%">
                        {column.items.map((item, index) => (
                          <Draggable 
                            draggableId={item.id} 
                            index={index} 
                            key={item.id}>
                              {(provided) => (
                                <Paper 
                                  elevation={2}
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps} 
                                  ref={provided.innerRef} 
                                  style={{backgroundColor: "#282e33",height: 50, borderRadius: 5, marginTop: 5, padding: 5, ...provided.draggableProps.style }}>
                                  <Typography variant='body1' sx={{color: "#FFF"}}>{item.content}</Typography>
                                </Paper>
                              )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        <Button sx={{marginTop: "15px", backgroundColor: "#FFFFFF00", border: "none", boxShadow: "none", '&:hover': {backgroundColor: "#282f28"}}} size='small' variant="contained" startIcon={<AddIcon />}>Adicionar um cartão</Button>
                      </Box>
                    </Box>
                  )}
              </Droppable>
            </Box>
          ))}
        </DragDropContext>
      </Box>
    </Box>
  );
}

export default App;
