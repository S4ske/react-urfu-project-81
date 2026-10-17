import FormBuilder, { type Template } from './FormBuilder.js';
import Tag from './Tag.js';

export { default as Tag } from './Tag.js';
export type { default as FormBuilder, InputOptions, Template } from './FormBuilder.js';

export type FormOptions = {
  url?: string;
  method?: string;
};

export default class HexletCode {
  static formFor(template: Template, options: FormOptions, callback: (form: FormBuilder) => void): string {
    const { url = '#', method = 'post' } = options;
    const builder = new FormBuilder(template);
    callback(builder);

    return new Tag('form', { action: url, method }, builder.toString()).toString();
  }
}
