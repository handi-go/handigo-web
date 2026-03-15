ALEMBIC_DIR=src/handigo_service/infrastructure/repository/alembic
VERSIONS_DIR=$(ALEMBIC_DIR)/migrations/versions

install:
	poetry install

coding-standard:
	pre-commit run --all-files

run-server:
	handigo-cli run-server

test:
	PYTHONPATH=src poetry run pytest -q src/tests/handigo_service

test-cov:
	PYTHONPATH=src poetry run pytest --cov=src/handigo_service/ -ra src/tests/handigo_service

start-infrastructure:
	docker compose up -d

stop-infrastructure:
	docker compose down

migrate:
	@echo 'Applying DB migrations...'
	export PYTHONPATH=${PYTHONPATH}:${CURDIR}/src && \
	cd $(ALEMBIC_DIR) && \
	python -m alembic upgrade head

migration:
	@echo 'Generating DB migrations...'
	export PYTHONPATH=${PYTHONPATH}:${CURDIR}/src && \
	cd $(ALEMBIC_DIR) && \
	python -m alembic revision --autogenerate -m "$(message)"

reset-migrations:
	@echo 'Downgrading all migrations back to base...'
	export PYTHONPATH=${PYTHONPATH}:${CURDIR}/src && \
	cd $(ALEMBIC_DIR) && \
	python -m alembic downgrade base

rebuild-migrations:
	@echo 'Rebuilding schema as a single migration...'
	$(MAKE) reset-migrations
	@echo 'Removing previous revision files...'
	find $(VERSIONS_DIR) -maxdepth 1 -type f -name '*.py' ! -name '__init__.py' -delete
	$(MAKE) migration message="$(message)"
