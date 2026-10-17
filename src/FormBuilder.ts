import Tag, { type Attributes } from './Tag.js';

export type Template = object;

export type InputOptions = Attributes & {
  as?: 'input' | 'textarea';
};

export default class FormBuilder {
  private readonly fields: Tag[] = [];

  private readonly template: Record<string, unknown>;

  constructor(template: Template) {
    this.template = template as Record<string, unknown>;
  }

  input(name: string, options: InputOptions = {}): void {
    if (!Object.hasOwn(this.template, name)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const { as = 'input', ...attributes } = options;
    const value = String(this.template[name] ?? '');

    if (as === 'textarea') {
      this.fields.push(new Tag('textarea', { cols: 20, rows: 40, name, ...attributes }, value));
      return;
    }

    this.fields.push(new Tag('input', { name, type: 'text', value, ...attributes }));
  }

  toString(): string {
    return this.fields.join('');
  }
}
