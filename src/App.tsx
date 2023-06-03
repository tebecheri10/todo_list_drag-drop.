import React, { FC, useState, FormEvent, useEffect } from "react";
import "./App.scss";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "./model";
import { v4 as uuidv4 } from 'uuid';


const App: FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: uuidv4(), todo, isDone: false }]);
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newTodos = Array.from(todos);
    const [removed] = newTodos.splice(source.index, 1);
    newTodos.splice(destination!.index, 0, removed);

    setTodos(newTodos);
  };

  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="App">
          <span className="heading"> Tasken </span>
          <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
          <TodoList todos={todos} setTodos={setTodos} />
        </div>
      </DragDropContext>
  );
};

export default App;
