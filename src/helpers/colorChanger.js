import moment from 'moment'

export const colorChanger = (task, flag) => {
  let now = moment.now();
  let difference = moment(task.expires_at).diff(now, 'minutes');
  if(difference <= 60 && difference > 0){
    return "MuiListItem-root-80 MuiListItem-default-83 MuiListItem-gutters-88 item-red";
  }
  else if(difference > 60 && difference <= 180){
    return "MuiListItem-root-80 MuiListItem-default-83 MuiListItem-gutters-88 item-yellow";
  }
  else if(difference < 0 && flag){
    return "MuiListItem-root-80 MuiListItem-default-83 MuiListItem-gutters-88 task-error";
  }
  else if(difference < 0){
    return "MuiListItem-root-80 MuiListItem-default-83 MuiListItem-gutters-88 item-red";
  }
  else{
    return "MuiListItem-root-80 MuiListItem-default-83 MuiListItem-gutters-88 item-green";
  }
};