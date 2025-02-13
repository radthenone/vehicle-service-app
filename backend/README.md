# backend

App running on python 3.12.1

## Development server local

install poetry
```Bash
  pip install poetry
```
next
```Bash
  poetry install
```
then
```Bash
poetry run python manage.py makemigrations
poetry run python manage.py migrate
```

```Bash
poetry run python manage.py runserver
```

environments in
.envs/.env.local