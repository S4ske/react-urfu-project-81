# Генератор форм на Typescript

[![hexlet-check](https://github.com/S4ske/react-urfu-project-81/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/S4ske/react-urfu-project-81/actions)
[![CI](https://github.com/S4ske/react-urfu-project-81/actions/workflows/ci.yml/badge.svg)](https://github.com/S4ske/react-urfu-project-81/actions/workflows/ci.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=S4ske_react-urfu-project-81&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=S4ske_react-urfu-project-81)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=S4ske_react-urfu-project-81&metric=coverage)](https://sonarcloud.io/summary/new_code?id=S4ske_react-urfu-project-81)

Библиотека, с помощью которой удобно создавать формы в шаблонах сайтов. Она заметно сокращает код описания формы за счет автоматической обработки ошибок и различных контролов.

Учебный проект Хекслета: https://ru.hexlet.io/


## Стек

- TypeScript

## Установка

Проект проверяется в CI на Node.js 24.

```bash
git clone https://github.com/S4ske/react-urfu-project-81.git
cd react-urfu-project-81
make install
make build
```

Проверки:

```bash
make lint
make typecheck
make test
make test-coverage
```

## Использование

```ts
import HexletCode from '@hexlet/code';

const template = { name: 'rob', job: 'hexlet', gender: 'm' };

const form = HexletCode.formFor(template, { url: '/users' }, (f) => {
  f.input('name', { class: 'user-input' });
  f.input('job', { as: 'textarea', rows: 50 });
  f.submit('Wow');
});

console.log(form);
// <form action="/users" method="post">
//   <label for="name">Name</label>
//   <input name="name" type="text" value="rob" class="user-input">
//   <label for="job">Job</label>
//   <textarea cols="20" rows="50" name="job">hexlet</textarea>
//   <input type="submit" value="Wow">
// </form>
```

Без аргумента `submit()` создаёт кнопку с текстом `Save`.

Если поля нет в шаблоне, будет выброшена ошибка:

```ts
HexletCode.formFor(template, {}, (f) => f.input('age'));
// Error: Field 'age' does not exist in the template.
```

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
