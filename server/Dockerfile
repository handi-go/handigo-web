FROM python:3.12-slim
MAINTAINER gregobinna@gmail.com

ENV PIP_DISABLE_PIP_VERSION_CHECK=on
ENV POETRY_NO_INTERACTION=1
ENV POETRY_VIRTUALENVS_CREATE=false

RUN /usr/local/bin/python -m pip install --upgrade pip

WORKDIR /app

RUN pip install poetry==1.8.3
RUN poetry config virtualenvs.create false

COPY ["pyproject.toml", "poetry.lock", "poetry.toml", "README.md", "./"]

RUN apt-get update && apt-get install make -y && apt-get clean

COPY ./src ./src
COPY Makefile ./

RUN poetry install

ENTRYPOINT ["handigo-cli"]
