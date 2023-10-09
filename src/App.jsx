import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialTodo = JSON.parse(localStorage.getItem('todo')) || [
    { id: 1, text: 'Learn react JS'},
    { id: 2, text: 'Lear Vue JS' },
    { id: 3, text: 'Lear Node JS' }
]

export const App = () => {
    const [todo, setTodo] = useState(initialTodo)

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todo))
    }, [todo])

    const handleDragEnd = (result) => {
        if (!result.destination) return;
    
        const startIndex = result.source.index;
        const endIndex = result.destination.index;
    
        const items = [...todo];
        
        // con splice estamos eliminando un elemento del array y devolviendo ese elemento
        const [reorderedItem] = items.splice(startIndex, 1);
    
        // con splice estamos insertando un elemento en el array
        items.splice(endIndex, 0, reorderedItem);
    
        setTodo(items);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <h1>Todo App</h1>
            <Droppable droppableId="todo">
                {(droppableProvider) => (
                    <ul
                        ref={droppableProvider.innerRef}
                        {...droppableProvider.droppableProps}
                    >
                        {todo.map((to, index) => (
                            <Draggable
                                key={to.id}
                                index={index}
                                draggableId={`${to.id}`}
                            >
                                {(draggableProvider) => (
                                    <li
                                        ref={draggableProvider.innerRef}
                                        {...draggableProvider.draggableProps}
                                        {...draggableProvider.dragHandleProps}
                                    >
                                        {to.text}
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {droppableProvider.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}
