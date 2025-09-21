install:
	poetry install

coding-standard:
	pre-commit run --all-files

run-server:
	handigo-cli run-server

test:
	poetry run pytest --cov=src/handigo_service/  -ra

start-infrastructure:
	docker compose up -d

stop-infrastructure:
	docker compose down

migrate:
	@echo 'Applying DB migrations...'
	export PYTHONPATH=${PYTHONPATH}:${CURDIR}/src && \
	cd src/handigo_service/infrastructure/repository/alembic/ && \
	python -m alembic upgrade head

migration:
	@echo 'Generating DB migrations...'
	export PYTHONPATH=${PYTHONPATH}:${CURDIR}/src && \
	cd src/handigo_service/infrastructure/repository/alembic/ && \
	python -m alembic revision --autogenerate -m "$(message)"
