export const SET_LIST = 'SET_LIST';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_CHECK_OF_TASK = 'UPDATE_CHECK_OF_TASK';
export const DELETE_DONE_TASKS_OF_USER = 'DELETE_DONE_TASKS_OF_USER';
export const DELETE_ITEM_CHECKED_LIST = 'DELETE_ITEM_CHECKED_LIST';
export const DELETE_TASKS_OF_USER = 'DELETE_TASKS_OF_USER';
export const UPDATE_ITEM_BY_ID = 'UPDATE_ITEM_BY_ID';

export const setListOfTasks = tasks => {
  return {
    type : SET_LIST,
    tasks
  }
};

export const deleteItemFromList = (key) => {
  return {
    type : DELETE_ITEM,
    key
  }
};

export const deleteItemFromCheckedList = (key) => {
  return {
    type : DELETE_ITEM_CHECKED_LIST,
    key
  }
};

export const updateCheckOfTask = (flag, index) => {
  return {
    type : UPDATE_CHECK_OF_TASK,
    flag,
    index
  }
};

export const deleteDoneTasksOfUser = () => {
  return {
    type : DELETE_DONE_TASKS_OF_USER,
  }
};

export const deleteTasksOfUser = () => {
  return {
    type : DELETE_TASKS_OF_USER,
  }
};

export const updateItemById = (task_id, text, deleted, isChecked) => {
  return {
    type : UPDATE_ITEM_BY_ID,
    task_id,
    text,
    deleted,
    isChecked
  }
};