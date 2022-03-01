import React, { useReducer, useState } from "react";
import "./App.css";
import { newId } from "./helpers";
import { TodoList } from "./TodoList";
import {
  Container,
  Button,
  Paper,
  Typography,
  FormGroup,
} from "@material-ui/core";
import {
  todoReducer,
  ACTION_ADD_ITEM,
  ACTION_REMOVE_ITEM,
  ACTION_COMPLETE_TOGGLE,
  ACTION_PRIORITY_UPDATE,
  ACTION_EDIT_ITEM,
} from "./todoReducer";

function App() {
  const [edit, setEdit] = useState(false);
  const [priority, setPriority] = useState(1);

  const [state, dispatch] = useReducer(todoReducer, {
    items: [],
  });

  const { items } = state;

  //priority sorter
  const itemsPrioritySort = () => {
    return items.sort((a: any, b: any) => a.priority - b.priority);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setPriority(priority + 1);
    const item = {
      id: newId(),
      priority: priority,
      text: e.target.elements[0].value,
      completed: false,
    };
    dispatch({ type: ACTION_ADD_ITEM, item });
    e.target.elements[0].value = "";
  };

  return (
    <Container>
      <Paper>
        <Typography variant="h4">Todo List</Typography>
        <FormGroup>
          <ol>
            {/* renders TODOs into separate ordered list component */}
            {itemsPrioritySort().map((item: any) => (
              <li key={item.id}>
                <TodoList
                  edit={edit}
                  setEdit={setEdit}
                  item={item}
                  priorityDispatch={(priority: any) =>
                    dispatch({
                      type: ACTION_PRIORITY_UPDATE,
                      item,
                      priorityTodo: priority,
                    })
                  }
                  editDispatch={(editedTodo: any) =>
                    dispatch({ type: ACTION_EDIT_ITEM, item, editedTodo })
                  }
                  checkCheckbox={() =>
                    dispatch({ type: ACTION_COMPLETE_TOGGLE, item })
                  }
                  removeDispatch={() =>
                    dispatch({ type: ACTION_REMOVE_ITEM, item })
                  }
                />
              </li>
            ))}
          </ol>
          <form onSubmit={handleSubmit} method="post">
            <input name="item" type="text" />
            <Button
              type="submit"
              value="submit"
              color="primary"
              size="small"
              variant="contained"
            >
              Add an Item
            </Button>
          </form>
        </FormGroup>
      </Paper>
    </Container>
  );
}

export default App;
