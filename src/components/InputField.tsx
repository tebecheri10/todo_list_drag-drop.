import React, { FC, FormEvent, useRef } from "react";
import "../styles/inputField.scss";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: FormEvent) => void;
}

const InputField: FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e:FormEvent)=>{
    handleAdd(e);
    if (inputRef.current) {
     setTodo("")
    }
  }
  return (
    <div className="form__container">
      <form
        className="input"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          data-testid="input"
          type="input"
          placeholder="Enter a task"
          className="input__box"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          ref={inputRef}
        />
        <button type="submit" className="input__submit" data-testid="submit-input">
          Add task
        </button>
      </form>
    </div>
  );
};

export default InputField;
