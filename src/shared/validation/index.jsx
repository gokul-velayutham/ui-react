import * as React from 'react';
import * as Ajv from 'ajv';
import * as ajvErrors from 'ajv-errors';
import {
  get, has, isNaN, isEmpty, slice, without,
} from 'lodash';

import helper from './keywords-helper';

const ajv = new Ajv({ allErrors: true });
ajv.addKeyword('email', { type: 'string', compile: helper.email });
ajv.addKeyword('number', { type: 'string', compile: helper.number });
ajvErrors(ajv);

export const validation = (settings = {}) => {
  const {
    data = {},
    schema = {},
  } = settings;
  const validate = ajv.compile(schema);

  // Remove the empty values for proper validation
  const filterData = Object.keys(data).reduce((acc, key) => {
    if (data[key] === null || data[key] === undefined || data[key] === '' || isNaN(data[key])
      || (data[key] instanceof Array && isEmpty(data[key]))) {
      return acc;
    }
    return { ...acc, [key]: data[key] };
  }, {});

  validate(filterData);

  console.log('validate', validate.errors)
  // Error validation
  let errors = (validate.errors || []).reduce((acc, error) => {
    console.log('error', error)
    const { instancePath, message, params } = error;
    let field;
    if (instancePath) {
      field = error.instancePath.substring(1);
    } else if (has(params, 'errors[0].params.missingProperty')) {
      field = get(params, 'errors[0].params.missingProperty');
    }
    if (field && message) {
      acc = { ...acc, [field]: message };
    }
    return acc;
  }, {});
  console.log('return errors', errors)
  return errors;
};

export const customErrorDiv = (text) => (
  <div
    style={{ fontSize: 'smaller', padding: '0px 0px 4px 10px', color: 'red' }}
  >
    {text}
  </div>
);

export const errorDiv = (errors, touched, field) => {
  if (!touched[field] || !errors[field]) {
    return null;
  }
  return customErrorDiv(errors[field]);
};
