import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import HexletCode, { type InputOptions } from '../src/index.js';

const readFixture = (name: string): string => readFileSync(
  new URL(`../__fixtures__/${name}`, import.meta.url),
  'utf-8',
).trim();

interface User {
  name: string;
  job: string;
  gender: string;
}

describe('HexletCode.formFor', () => {
  const template: User = { name: 'rob', job: 'hexlet', gender: 'm' };

  test('empty form with defaults', () => {
    const form = HexletCode.formFor(template, {}, () => {});
    expect(form).toBe('<form action="#" method="post"></form>');
  });

  test('form with url', () => {
    const form = HexletCode.formFor(template, { url: '/users' }, () => {});
    expect(form).toBe('<form action="/users" method="post"></form>');
  });

  test('form with method', () => {
    const form = HexletCode.formFor(template, { url: '/users', method: 'get' }, () => {});
    expect(form).toBe('<form action="/users" method="get"></form>');
  });

  test('input and textarea fields', () => {
    const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
      f.input('name');
      f.input('job', { as: 'textarea' });
    });
    expect(form).toBe(readFixture('fields.html'));
  });

  test('additional attributes', () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input('name', { class: 'user-input' });
      f.input('job');
    });
    expect(form).toBe(readFixture('attributes.html'));
  });

  test('textarea with default size', () => {
    const form = HexletCode.formFor(template, {}, f => f.input('job', { as: 'textarea' }));
    expect(form).toBe(readFixture('textarea.html'));
  });

  test('textarea with custom size', () => {
    const form = HexletCode.formFor(template, { url: '#' }, f => f.input('job', { as: 'textarea', rows: 50, cols: 50 }));
    expect(form).toBe(readFixture('textarea-custom-size.html'));
  });

  test('empty value for null field', () => {
    const form = HexletCode.formFor({ name: null }, {}, (f) => {
      f.input('name');
    });
    expect(form).toBe('<form action="#" method="post"><label for="name">Name</label><input name="name" type="text" value=""></form>');
  });

  test('submit with default value', () => {
    const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
      f.input('name');
      f.input('job', { as: 'textarea' });
      f.submit();
    });
    expect(form).toBe(readFixture('submit.html'));
  });

  test('submit with custom value', () => {
    const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
      f.input('name');
      f.input('job', { as: 'textarea' });
      f.submit('Wow');
    });
    expect(form).toBe(readFixture('submit-custom.html'));
  });

  test('throws on unknown field type', () => {
    expect(() => HexletCode.formFor(template, {}, (f) => {
      f.input('name', { as: 'select' } as unknown as InputOptions);
    })).toThrow('Unknown field type: \'select\'.');
  });

  test('throws on missing field', () => {
    expect(() => HexletCode.formFor(template, { url: '/users' }, (f) => {
      f.input('name');
      f.input('job', { as: 'textarea' });
      f.input('age');
    })).toThrow('Field \'age\' does not exist in the template.');
  });
});
