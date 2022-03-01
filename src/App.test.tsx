import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "./App";

//basic unit and integration tests to test actual user interaction is working as expected

test('should display "add an item" button', () => {
  const { getByRole } = render(<App />);
  getByRole("button", { name: "Add an Item" });
});

test("should display input value in inputfield", () => {
  const { getByRole } = render(<App />);
  const inputField = getByRole("textbox");
  userEvent.type(inputField, "get milk");
  expect(inputField).toHaveValue("get milk");
});

test("should display todo items that are entered ", () => {
  const { getByRole, getByText } = render(<App />);
  const submit = getByRole("button", { name: "Add an Item" });
  const inputField = getByRole("textbox");
  userEvent.type(inputField, "get milk");
  userEvent.click(submit);
  expect(getByText("get milk")).toBeVisible();
  userEvent.type(inputField, "get bread");
  userEvent.click(submit);
  expect(getByText("get bread")).toBeVisible();
});

test("should remove todo items when clicking remove button by item", () => {
  const { getByRole, getByText, queryByText } = render(<App />);
  const submit = getByRole("button", { name: "Add an Item" });
  const inputField = getByRole("textbox");
  userEvent.type(inputField, "get milk");
  userEvent.click(submit);
  expect(getByText("get milk")).toBeVisible();
  userEvent.click(getByRole("button", { name: /remove/i }));
  const todo = queryByText("get milk");
  expect(todo).toBeNull();
});

test("should be able to edit a todo after its created", () => {
  const { getByRole, getByText, queryAllByRole } = render(<App />);
  const submit = getByRole("button", { name: "Add an Item" });
  const inputField = getByRole("textbox");
  userEvent.type(inputField, "get milk");
  userEvent.click(submit);
  expect(getByText("get milk")).toBeVisible();
  const editField = getByRole("button", { name: "Edit" });

  userEvent.click(editField);
  const newTodo = queryAllByRole("textbox")[0];
  userEvent.type(newTodo, "get milkchanged input");
  userEvent.click(getByRole("button", { name: "Save" }));
  expect(getByText(/get milkchanged input/i)).toBeVisible();
});

//need to finish this priority test
test("should reorder list based on item priority", () => {
  const { getByRole, getAllByRole } = render(<App />);
  const submit = getByRole("button", { name: "Add an Item" });
  const inputField = getByRole("textbox");

  userEvent.type(inputField, "get milk");
  userEvent.click(submit);
  userEvent.type(inputField, "get bread");
  userEvent.click(submit);
  userEvent.type(inputField, "get bread");
  userEvent.click(submit);

  const priorityField = getAllByRole("textbox", { name: /priority/i })[0];
  userEvent.clear(priorityField);
  userEvent.type(priorityField, "4");
});
