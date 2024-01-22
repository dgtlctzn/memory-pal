.PHONY: build
build:
	virtualenv --python=python3.8 .venv

.PHONY: layer
layer:
	docker build -t memory-pal .
	docker run -d --name memory-pal memory-pal
	docker cp memory-pal:/working/memory-layer.zip .

.PHONY: main
main:
	cd functions && zip ../memory-man-2.zip memory.py
	aws lambda update-function-code --function-name MemoryMan --zip-file fileb://memory-man-2.zip

.PHONY: signup
signup:
	.venv/bin/pytest ./tests/setup_tests.py ./tests/signup_tests.py
	cd functions && zip ../memory-signup.zip signup.py
	aws lambda update-function-code --function-name MemoryLogin2 --zip-file fileb://memory-signup.zip

.PHONY: login
login:
	.venv/bin/pytest ./tests/setup_tests.py ./tests/login_tests.py
	cd functions && zip ../memory-login.zip login.py
	aws lambda update-function-code --function-name MemoryLogUserIn --zip-file fileb://memory-login.zip

.PHONY: add_info
add_info:
	cd functions && zip ../memory-add-info.zip add_info.py
	aws lambda update-function-code --function-name MemoryUpdateUser2 --zip-file fileb://memory-add-info.zip

.PHONY: add_event
add_event:
	cd functions && zip ../memory-add-event.zip add_event.py
	aws lambda update-function-code --function-name MemoryAddEvent --zip-file fileb://memory-add-event.zip

.PHONY: get_events
get_events:
	cd functions && zip ../memory-get-events.zip get_events.py
	aws lambda update-function-code --function-name MemoryGetEvents --zip-file fileb://memory-get-events.zip

.PHONY: select_event
select_event:
	cd functions && zip ../memory-select-event.zip select_event.py
	aws lambda update-function-code --function-name MemorySelectEvent --zip-file fileb://memory-select-event.zip

.PHONY: delete_event
delete_event:
	cd functions && zip ../memory-delete-event.zip delete_event.py
	aws lambda update-function-code --function-name MemoryDeleteEvent --zip-file fileb://memory-delete-event.zip

.PHONY: text_events
text_events:
	.venv/bin/pytest ./tests/setup_tests.py ./tests/event_text_tests.py
	cd functions && zip ../memory-text-events.zip text_events.py
	aws lambda update-function-code --function-name MemoryTextEvents2 --zip-file fileb://memory-text-events.zip

.PHONY: get_user
get_user:
	.venv/bin/pytest ./tests/setup_tests.py ./tests/get_user_tests.py
	cd functions && zip ../memory-get-user.zip get_user.py
	aws lambda update-function-code --function-name MemoryGetUser --zip-file fileb://memory-get-user.zip

.PHONY: delete_user
delete_user:
	.venv/bin/pytest ./tests/setup_tests.py
	cd functions && zip ../memory-delete-user.zip delete_user.py
	aws lambda update-function-code --function-name MemoryDeleteUser2 --zip-file fileb://memory-delete-user.zip

.PHONY: test
test:
	.venv/bin/pytest ./tests/*tests.py

.PHONY: clean_zip
clean_zip:
	rm memory-login.zip
	rm memory-layer.zip
	cd layer && rm -rf python
	rm memory-man-2.zip

.PHONY: clean_env
clean_env:
	rm -rf .venv
	rm -rf .pytest_cache