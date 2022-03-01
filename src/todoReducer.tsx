const ACTION_ADD_ITEM = "ADD_ITEM";
const ACTION_REMOVE_ITEM = "REMOVE_ITEM";
const ACTION_COMPLETE_TOGGLE = "COMPLETE_ITEM_TOGGLE";
const ACTION_EDIT_ITEM = "EDIT_ITEM";
const ACTION_PRIORITY_UPDATE = "PRIORITY_UPDATE";

//reusable item index finder for finding editing, remove, reorder
const findItem = (state: any, action: any) => {
  const completedItemIndex = state.items.findIndex(
    (item: any) => item.id === action.item.id
  );
  const arrayCopy = [...state.items];
  return { completedItemIndex, arrayCopy };
};

const todoReducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION_ADD_ITEM:
      return Object.assign({}, state, {
        items: [...state.items, action.item],
      });

    case ACTION_REMOVE_ITEM:
      return Object.assign({}, state, {
        items: state.items.filter((item: any) => item.id !== action.item.id),
      });
    case ACTION_EDIT_ITEM: {
      const { arrayCopy, completedItemIndex } = findItem(state, action);
      arrayCopy[completedItemIndex].text = action.editedTodo;
      return (
        Object.assign,
        state,
        {
          items: [...arrayCopy],
        }
      );
    }
    case ACTION_COMPLETE_TOGGLE: {
      const { arrayCopy, completedItemIndex } = findItem(state, action);
      arrayCopy[completedItemIndex].completed = !action.item.completed;
      return (
        Object.assign,
        state,
        {
          items: [...arrayCopy],
        }
      );
    }
    case ACTION_PRIORITY_UPDATE: {
      const { arrayCopy, completedItemIndex } = findItem(state, action);
      arrayCopy[completedItemIndex].priority = action.priorityTodo;
      return (
        Object.assign,
        state,
        {
          items: [...arrayCopy],
        }
      );
    }
    default:
      return state;
  }
};

export {
  todoReducer,
  ACTION_ADD_ITEM,
  ACTION_REMOVE_ITEM,
  ACTION_COMPLETE_TOGGLE,
  ACTION_EDIT_ITEM,
  ACTION_PRIORITY_UPDATE,
};
