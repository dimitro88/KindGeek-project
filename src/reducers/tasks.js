import { SET_LIST, DELETE_ITEM, UPDATE_CHECK_OF_TASK, DELETE_DONE_TASKS_OF_USER, DELETE_ITEM_CHECKED_LIST, DELETE_TASKS_OF_USER, UPDATE_ITEM_BY_ID } from "../actions/tasks"

const initialState = {
  tasks : [],
  checkedTasks : []
};

export default (state = initialState, action) => {
  const tasks = [...state.tasks];
  const checkedTasks = [...state.checkedTasks];
  switch(action.type){
    case SET_LIST:
      let tasksTemp = [];
      let checkedTasksTemp = [];
      action.tasks.forEach(task => {
        task.isChecked === true ? checkedTasksTemp.push(task) : tasksTemp.push(task);
      });
      return {
        ...state,
        tasks: tasksTemp,
        checkedTasks: checkedTasksTemp
      };
    case DELETE_ITEM:
      tasks.splice(action.key,1);
      return {
        ...state,
        tasks: tasks
      };
    case UPDATE_CHECK_OF_TASK:
      if(action.flag === true){
        tasks[action.index].isChecked = action.flag;
        let tempTask = tasks.splice(action.index,1);
        checkedTasks.push(tempTask[0]);
        return {
          ...state,
          tasks: tasks,
          checkedTasks: checkedTasks
        };
      }
      else{
        checkedTasks[action.index].isChecked = action.flag;
        let tempTask = checkedTasks.splice(action.index,1);
        tasks.push(tempTask[0]);
        return {
          ...state,
          tasks: tasks,
          checkedTasks: checkedTasks
        };
      }
    case DELETE_DONE_TASKS_OF_USER:
      return {
        ...state,
        tasks: tasks,
        checkedTasks: []
      };
    case DELETE_TASKS_OF_USER:
      return {
        ...state,
        tasks: [],
        checkedTasks: checkedTasks
      };
    case DELETE_ITEM_CHECKED_LIST:
      checkedTasks.splice(action.key,1);
      return {
        ...state,
        checkedTasks: checkedTasks
      };
    case UPDATE_ITEM_BY_ID:
      let updateTasks = [];
      action.isChecked ? updateTasks = [...state.checkedTasks] : updateTasks = [...state.tasks];
      if(action.deleted){
        let tasksAfterDeleting = updateTasks.filter(task => {
          if(task._id !== action.task_id){return task}
        });
        if(action.isChecked) {
          return {
            ...state,
            checkedTasks: tasksAfterDeleting
          }
        }
        else{
          return {
            ...state,
            tasks: tasksAfterDeleting
          }
        }
      }
      else{
        updateTasks.forEach(task => {
          if(task._id === action.task_id)task.text = action.text
        });
        if(action.isChecked) {
          return {
            ...state,
            checkedTasks: updateTasks
          }
        }
        else{
          return {
            ...state,
            tasks: updateTasks
          }
        }
      }
    default: return state;
  }
}