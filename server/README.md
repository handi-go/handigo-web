# Handigo Service


## Requirements

* Python 3.12.1 (Use `pyenv` to manage different python versions)
* Poetry 1.8.3

Install `poetry` on your develop machine as described [here](https://python-poetry.org/docs/#installation).

## Domain Description

[TBD]

## Local Setup and Installation

- To install the project's dependencies run the following command in the root of the project:

```
make install
```

- Install pre-commit hook (For development purpose only):

```
pre-commit install
```

- Start the infrastructure:

```
make start-infrastructure
```

- Apply DB migrations:

```
make migrate
```

- Run tests:

```
make test
```

### Additional Commands

Run coding standard check using pre-commit:

```shell
git add <files>
make coding-standard
```

Run linting and formatting for html files
```
djlint <filespath or directory> --check
djlint <filespath or directory> --reformat
```

## Database Migration

- To create a new migration file after making changes to the orm models:

```shell
make migration message="<create some table>"
```
