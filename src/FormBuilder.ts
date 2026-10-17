import type { Attributes, Field } from './types.js';

export type { Field, Form, InputField, SubmitField } from './types.js';

export type Template = object;

export type InputOptions = {
  as?: 'input' | 'textarea';
  label?: string;
  labelHtml?: Attributes;
  [attribute: string]: string | number | Attributes | undefined;
};

const capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

export default class FormBuilder {
  private items: readonly Field[] = [];

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

    const { as = 'input', label = capitalize(name), labelHtml = {}, ...attributes } = options;
    const field: Field = {
      type: as,
      name,
      label,
      labelAttributes: labelHtml,
      value: String(this.template[name] ?? ''),
      attributes: attributes as Attributes,
    };

    this.items = [...this.items, field];
  }

  submit(value = 'Save'): void {
    this.items = [...this.items, { type: 'submit', value }];
  }
}
