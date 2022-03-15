/* eslint-disable max-len */
const emailValidation = (schemaOption) => (data) => {
  // eslint-disable-next-line
  const pattern = "[-!#$%&'*+\\/0-9=?A-Z^_a-z{|}~](\\.?[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\\.?[a-zA-Z0-9])*\\.[a-zA-Z](-?[a-zA-Z0-9])+";
  let regexStr = pattern;
  if (schemaOption.multiple) {
    regexStr = `^(${pattern})([,;]\\s*${pattern})*$`;
  } else {
    regexStr = `^${pattern}$`;
  }
  const regex = new RegExp(regexStr);
  return regex.test(data);
};

const numberValidation = () => (data) => {
  // eslint-disable-next-line
  const pattern = /^[0-9]+$/;
  const regex = new RegExp(pattern);
  console.log('numberValidation', regex.test(data))
  return regex.test(data);
};


export default {
  email: emailValidation,
  number: numberValidation,
};
