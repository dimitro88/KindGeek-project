export const required = value => value ? undefined: "*required";

export const email = value => {
  const r = /^\w+@\w+\.\w{2,4}$/i;

  if (!r.test(value)) {
    return 'Incorrect email';
  }
  return undefined;
};

export const password = value => {
  if(value.length < 8){
    return 'Password must bo longer than 8';
  }
  return undefined;
};