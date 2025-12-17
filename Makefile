install:
	npm ci

test:
	npm test

test-watch:
	npm run test:watch

lint:
	npm run lint

lint-fix:
	npm run lint:fix

gendiff:
	node bin/gendiff.js

help:
	node bin/gendiff.js -h

version:
	node bin/gendiff.js -V

.PHONY: test lint gendiff help version
