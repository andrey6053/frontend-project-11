install: #Установка проекта
	npm ci
lint: #Запуск eslint
	npx eslint .
lintFix: #Запуск eslint fix
	npx eslint . --fix
publish:
	npm publish --dry-run