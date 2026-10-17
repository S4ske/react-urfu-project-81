import Tag from './Tag.js';
import type { Field, Form, InputField, SubmitField } from './types.js';

const renderLabel = ({ name, label }: InputField): Tag => new Tag('label', { for: name }, label);

const renderInput = (field: InputField): string => {
  const { name, value, attributes } = field;
  const input = new Tag('input', { name, type: 'text', value, ...attributes });

  return `${renderLabel(field)}${input}`;
};

const renderTextarea = (field: InputField): string => {
  const { name, value, attributes } = field;
  const textarea = new Tag('textarea', { cols: 20, rows: 40, name, ...attributes }, value);

  return `${renderLabel(field)}${textarea}`;
};

const renderSubmit = ({ value }: SubmitField): string => new Tag('input', { type: 'submit', value }).toString();

const renderField = (field: Field): string => {
  switch (field.type) {
    case 'input':
      return renderInput(field);
    case 'textarea':
      return renderTextarea(field);
    case 'submit':
      return renderSubmit(field);
    default:
      throw new Error(`Unknown field type: '${(field as { type: string }).type}'.`);
  }
};

export default ({ action, method, fields }: Form): string => {
  const body = fields.map(renderField).join('');

  return new Tag('form', { action, method }, body).toString();
};
