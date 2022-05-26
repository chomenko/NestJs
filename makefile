up:
	@docker-compose up
exec:
	@docker-compose exec server bash
test:
	@docker-compose exec server bash -c "npm run test"
test-watch:
	@docker-compose exec server bash -c "npm run test:watch"
down:
	@docker-compose down
%:
    @:
