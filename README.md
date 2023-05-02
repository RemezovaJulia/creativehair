# Creative hair
Дипломный проект парикмахерской

![Build Status](https://github.com/RemezovaJulia/creativehair/actions/workflows/ci.yml/badge.svg?event=push)
[![Coverage Status](https://coveralls.io/repos/github/RemezovaJulia/creativehair/badge.svg)](https://coveralls.io/github/RemezovaJulia/creativehair)
[![Go Report Card](https://goreportcard.com/badge/github.com/RemezovaJulia/creativehair)](https://goreportcard.com/report/github.com/RemezovaJulia/creativehair)

### Не забудьте переименовать файл .env.example в .env, а также настроить в нём свои переменные. ###

### Как скомпилировать проект? ###
1. можно использовать утилиту make:
    [windows](https://gnuwin32.sourceforge.net/downlinks/make.php) или [unix](https://ftp.gnu.org/gnu/make/)
    далее нужно прейти в папку с проектом cd creativehair и выполнить команду: `make go-build`. Бинарный файл
    будет находиться по пути: _creativehair/cmd/creativehair_;
2. используя компилятор Go, нужно перейти по пути _creativehair/cmd/creativehair_ 
   затем выполнить команду: `go build -o filename(.exe)` 

### Как запустить проект? ###
1. установить [postgresql](https://www.postgresql.org/download/)
2. создать базу данных **creativehair**, выполнить команду: `createdb creativehair`
3. установить [golang-migrate](https://pkg.go.dev/github.com/golang-migrate/migrate) 
   нужно выполнить команду: `go install -u 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate`
4. 'накатить' миграции выполнить команду в корне проекта: `make all-migrate-up` или
   `migrate -path ~/your_path_to_the_project/creativehair/internal/migrations -database postgres://user:password@localhost:5432/database_name?sslmode=disable up`
только не забудьте, то что строка: **postgres://user:password@localhost:5432/database_name?sslmode=disable** должна иметь
формат URL, то есть такие спец символы как:'^', '!', '#' должны быть хэшированные в формат url: https://snipp.ru/handbk/url-code