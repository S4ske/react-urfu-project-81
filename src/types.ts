export type Attributes = Record<string, string | number>;

export type InputField = {
  type: 'input' | 'textarea';
  name: string;
  label: string;
  labelAttributes: Attributes;
  value: string;
  attributes: Attributes;
};

export type SubmitField = {
  type: 'submit';
  value: string;
};

export type Field = InputField | SubmitField;

export type Form = {
  action: string;
  method: string;
  fields: readonly Field[];
};
