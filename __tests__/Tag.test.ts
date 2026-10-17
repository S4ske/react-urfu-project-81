import { describe, expect, test } from 'vitest';
import Tag from '../src/Tag.js';

describe('Tag', () => {
  test.each([
    [new Tag('br'), '<br>'],
    [new Tag('img', { src: 'path/to/image' }), '<img src="path/to/image">'],
    [new Tag('input', { type: 'submit', value: 'Save' }), '<input type="submit" value="Save">'],
  ])('single tag %#', (tag, expected) => {
    expect(tag.toString()).toBe(expected);
  });

  test.each([
    [new Tag('label', {}, 'Email'), '<label>Email</label>'],
    [new Tag('label', { for: 'email' }, 'Email'), '<label for="email">Email</label>'],
    [new Tag('div'), '<div></div>'],
  ])('paired tag %#', (tag, expected) => {
    expect(tag.toString()).toBe(expected);
  });

  test('single tag ignores body', () => {
    expect(new Tag('br', {}, 'text').toString()).toBe('<br>');
  });

  test('numeric attributes', () => {
    const tag = new Tag('textarea', { cols: 20, rows: 40, name: 'job' }, 'hexlet');
    expect(tag.toString()).toBe('<textarea cols="20" rows="40" name="job">hexlet</textarea>');
  });

  test('works in template strings', () => {
    expect(`${new Tag('hr')}`).toBe('<hr>');
  });
});
