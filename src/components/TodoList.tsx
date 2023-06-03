import React, { FC } from "react";
import { Todo } from "../model";
import SingleTodoItem from "./SingleTodoItem";

import "../styles/TodoList.scss";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: FC<Props> = ({ todos, setTodos }) => {
  return (
    <Droppable droppableId="TodoList">
      {(provided) => (
        <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
          {todos.map((todo, index) => {
            return (
              <SingleTodoItem
               index={index}
                todos={todos}
                key={todo.id}
                todo={todo}
                setTodos={setTodos}
              />
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TodoList;
