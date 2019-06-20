export const containsEmptyStrings = args => {
  for (let i = 0; i < args.length; ++i)
    if (undefined === args[i] || '' === args[i]) return true;
  return false;
};

export const isEmptyString = str => {
  return undefined === str || null === str || '' === str;
};

export const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const checkOnlyDigits = str => {
  const regex = /^\d+$/;
  return regex.test(str);
};

export const checkOnlyAlphas = str => {
  const regex = /^[a-zA-Z]*$/;
  return regex.test(str);
};

export const checkRegno = regno => {
  return regno.toString().length === 9 && checkOnlyDigits(regno);
};

export const validateName = name => {
  const re = /\d/;
  if (re.test(name)) return false; // string contains digits
  if (name.trim().indexOf(' ') > 0) return false; // string contains white spaces
  return true;
};
