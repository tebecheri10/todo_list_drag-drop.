import React, { FC, useState, useEffect, useRef } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

import "../styles/singleTodoItem.scss";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
};

const SingleTodoItem: FC<Props> = ({ todo, setTodos, todos, index }) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDone = (id: string): void => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
      })
    );
  };

  const handleDelete = (id: string): void => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: string) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, todo: editTodo } : todo;
      })
    );

    setEdit(false);
  };

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <form
          data-testid="todo-item"
          className="todo__single"
          onSubmit={(e) => {
            handleEdit(e, todo.id);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}

        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => {
                setEditTodo(e.target.value);
              }}
              className="editInput"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todo__single--text">{todo.todo}</s>
          ) : (
            <span className="todo__single--text">{todo.todo}</span>
          )}
          <div
            className="icon"
            onClick={() => {
              setEdit(true);
            }}
          >
            <AiFillEdit />
          </div>
          <div
            className="icon"
            onClick={() => {
              handleDelete(todo.id);
            }}
          >
            <AiFillDelete />
          </div>
          <div className="icon" onClick={() => handleDone(todo.id)}>
            <MdDone />
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodoItem;
