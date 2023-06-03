import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import App from "../App";

afterEach(cleanup);

describe("App global test", ():void => {
  test("renders App title", ():void => {
    render(<App />);
    const linkElement = screen.getByText("Tasken");
    expect(linkElement).toBeInTheDocument();
  });

  test("renders Input to create todo", ():void => {
    render(<App />);

    const input = screen.getByTestId("input");
    expect(input).toBeInTheDocument();
  });

  test("creates a todo card when pressing enter on input", ():void => {
    render(<App />);

    const input = screen.getByTestId("input");
    const submit = screen.getByTestId("submit-input");

    fireEvent.change(input, { target: { value: "Nuevo todo" } });
    fireEvent.click(submit);

    const todoText = screen.getByText("Nuevo todo");
    expect(todoText).toBeInTheDocument();
  });
});
