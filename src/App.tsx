import React, { useReducer } from "react";
import "./App.css";
import { newId } from "./helpers";
import { withStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
/**
 * - Style this app using Material-UI: https://material-ui.com/
 * - Add the ability to remove an item from the list
 * - Add the ability to edit an item from the list
 * - Add the ability to mark an item as complete
 * - Add the ability to sort the items
 */

function App({ classes }: any) {
  const ACTION_ADD_ITEM = "ADD_ITEM";

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTION_ADD_ITEM:
        return Object.assign({}, state, {
          items: [...state.items, action.item],
        });
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    items: [],
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const item = {
      id: newId(),
      text: e.target.item.value,
      completed: false,
    };
    dispatch({ type: ACTION_ADD_ITEM, item });
    e.target.item.value = "";
  };

  return (
    <Container>
      <ul>
        {state.items.map((item: any) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} method="post">
        <input name="item" type="text" />
        <input type="submit" value="Add an Item" />
      </form>
    </Container>
  );
}

const styles = {};
export default withStyles(styles)(App);
