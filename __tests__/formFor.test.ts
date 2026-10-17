import { describe, expect, test } from 'vitest';
import HexletCode from '../src/index.js';

describe('HexletCode.formFor', () => {
  const template = { name: 'rob', job: 'hexlet', gender: 'm' };

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

  test('calls callback with form builder', () => {
    let called = false;
    HexletCode.formFor(template, {}, (f) => {
      called = f !== undefined;
    });
    expect(called).toBe(true);
  });
});
