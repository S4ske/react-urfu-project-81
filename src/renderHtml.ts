import type { Field, Form, InputField } from './FormBuilder.js';
import Tag from './Tag.js';

const renderControl = ({ type, name, value, attributes }: InputField): Tag => {
  if (type === 'textarea') {
    return new Tag('textarea', { cols: 20, rows: 40, name, ...attributes }, value);
  }

  return new Tag('input', { name, type: 'text', value, ...attributes });
};

const renderField = (field: Field): string => {
  if (field.type === 'submit') {
    return new Tag('input', { type: 'submit', value: field.value }).toString();
  }

  const label = new Tag('label', { for: field.name }, field.label);

  return `${label}${renderControl(field)}`;
};

export default ({ action, method, fields }: Form): string => {
  const body = fields.map(renderField).join('');

  return new Tag('form', { action, method }, body).toString();
};
