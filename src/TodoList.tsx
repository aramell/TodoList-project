import React from "react";
import "./App.css";
import {
  Button,
  Checkbox,
  Typography,
  ButtonGroup,
  Input,
  FormLabel,
} from "@material-ui/core";

type AppProps = {
  checkCheckbox: Function;
  item: any;
  editDispatch: Function;
  edit: Boolean;
  setEdit: Function;
  removeDispatch: Function;
  priorityDispatch: Function;
};

const TodoList = ({
  checkCheckbox,
  setEdit,
  item,
  editDispatch,
  edit,
  priorityDispatch,
  removeDispatch,
}: AppProps) => {
  return (
    <>
      {/* checkbox for completing an item */}
      <Checkbox checked={item.completed} onClick={() => checkCheckbox()} />
      {edit ? (
        //   editable field for updating todo item
        <Input
          name="todoItem"
          type="text"
          defaultValue={item.text}
          onChange={(e) => editDispatch(e.target.value)}
        />
      ) : (
        //   non editable field for today item
        <Typography variant="subtitle2">{item.text}</Typography>
      )}
      <div className="priority">
        {/* priority input field for lowest value ordering of todo list i.e. 1 would be higher than 2 */}
        <FormLabel>Priority</FormLabel>
        <Input
          name="priority"
          type="text"
          inputProps={{ "aria-label": "priority" }}
          defaultValue={item.priority}
          onChange={(e) => priorityDispatch(e.target.value)}
        />
      </div>
      <ButtonGroup variant="outlined">
        {!edit ? (
          <Button
            color="secondary"
            size="small"
            variant="contained"
            type="submit"
            onClick={() => setEdit(!edit)}
          >
            Edit
          </Button>
        ) : (
          <Button
            color="secondary"
            size="small"
            variant="contained"
            type="submit"
            onClick={() => setEdit(!edit)}
          >
            Save
          </Button>
        )}
        <Button
          color="secondary"
          size="small"
          variant="contained"
          onClick={() => removeDispatch()}
        >
          Remove
        </Button>
      </ButtonGroup>
    </>
  );
};

export { TodoList };
