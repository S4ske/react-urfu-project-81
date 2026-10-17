import FormBuilder, { type Template } from './FormBuilder.js';
import Tag from './Tag.js';

export { default as Tag } from './Tag.js';

export type FormOptions = {
  url?: string;
  method?: string;
};

export default class HexletCode {
  static formFor(template: Template, options: FormOptions, callback: (form: FormBuilder) => void): string {
    const { url = '#', method = 'post' } = options;
    callback(new FormBuilder(template));

    return new Tag('form', { action: url, method }).toString();
  }
}
