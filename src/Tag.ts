import type { Attributes } from './types.js';

export type { Attributes } from './types.js';

const singleTags = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr',
]);

export default class Tag {
  constructor(
    private readonly name: string,
    private readonly attributes: Attributes = {},
    private readonly body = '',
  ) {}

  toString(): string {
    const attrs = Object.entries(this.attributes)
      .map(([key, value]) => ` ${key}="${value}"`)
      .join('');
    const openTag = `<${this.name}${attrs}>`;

    if (singleTags.has(this.name)) {
      return openTag;
    }

    return `${openTag}${this.body}</${this.name}>`;
  }
}
