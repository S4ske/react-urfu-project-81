install:
	npm ci

build:
	npm run build

lint:
	npm run lint

lint-fix:
	npm run lint-fix

typecheck:
	npm run typecheck

test:
	npm run test

test-coverage:
	npm run test-coverage

.PHONY: install build lint lint-fix typecheck test test-coverage
