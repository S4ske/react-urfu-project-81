import type { Attributes } from './Tag.js';

export type Template = object;

export type InputOptions = Attributes & {
  as?: 'input' | 'textarea';
};

export type InputField = {
  type: 'input' | 'textarea';
  name: string;
  label: string;
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

const capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

export default class FormBuilder {
  private readonly items: Field[] = [];

  private readonly template: Record<string, unknown>;

  constructor(template: Template) {
    this.template = template as Record<string, unknown>;
  }

  get fields(): readonly Field[] {
    return this.items;
  }

  input(name: string, options: InputOptions = {}): void {
    if (!Object.hasOwn(this.template, name)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const { as = 'input', ...attributes } = options;

    this.items.push({
      type: as,
      name,
      label: capitalize(name),
      value: String(this.template[name] ?? ''),
      attributes,
    });
  }

  submit(value = 'Save'): void {
    this.items.push({ type: 'submit', value });
  }
}
