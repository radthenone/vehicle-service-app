FROM python:3.12-slim AS builder

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache

WORKDIR /app

COPY poetry.lock pyproject.toml ./

RUN pip install poetry poetry-plugin-export \
    && poetry export --without-hashes -f requirements.txt -o requirements.txt \
    && pip wheel --wheel-dir /wheels -r requirements.txt \
    && rm -rf "$POETRY_CACHE_DIR"

FROM python:3.12-slim

WORKDIR /app/src

RUN apt-get update && apt-get install --no-install-recommends -y \
    libpq-dev \
    procps \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /wheels /wheels
RUN pip install --no-cache-dir --no-index --find-links=/wheels/ /wheels/* \
    && rm -rf /wheels

COPY . .

RUN sed -i 's/\r$//g' ./docker/entrypoint.sh && chmod +x ./docker/entrypoint.sh
RUN sed -i 's/\r$//g' ./docker/runserver.sh && chmod +x ./docker/runserver.sh

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

ENTRYPOINT ["/app/src/docker/entrypoint.sh"]

CMD ["/app/src/docker/runserver.sh"]