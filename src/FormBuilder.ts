export type Template = Record<string, unknown>;

export default class FormBuilder {
  constructor(readonly template: Template) {}
}
