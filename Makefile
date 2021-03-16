build:
	virtualenv --python=python3.8 .venv

layer:
	cd layer && mkdir python
	pip install -r requirements.txt -t ./layer/python
	cd layer && zip -r ../memory-layer.zip *

main:
	cd functions && zip ../memory-man-2.zip memory.py
	aws lambda update-function-code --function-name MemoryMan --zip-file fileb://memory-man-2.zip

signup:
	cd functions && zip ../memory-signup.zip signup.py
	aws lambda update-function-code --function-name MemoryLogin --zip-file fileb://memory-signup.zip

login:
	cd functions && zip ../memory-login.zip login.py
	aws lambda update-function-code --function-name MemoryLogUserIn --zip-file fileb://memory-login.zip

add_info:
	cd functions && zip ../memory-add-info.zip add_info.py
	aws lambda update-function-code --function-name MemoryUpdateUser --zip-file fileb://memory-add-info.zip

add_event:
	cd functions && zip ../memory-add-event.zip add_event.py
	aws lambda update-function-code --function-name MemoryAddEvent --zip-file fileb://memory-add-event.zip

get_events:
	cd functions && zip ../memory-get-events.zip get_events.py
	aws lambda update-function-code --function-name MemoryGetEvents --zip-file fileb://memory-get-events.zip

select_event:
	cd functions && zip ../memory-select-event.zip select_event.py
	aws lambda update-function-code --function-name MemorySelectEvent --zip-file fileb://memory-select-event.zip

delete_event:
	cd functions && zip ../memory-delete-event.zip delete_event.py
	aws lambda update-function-code --function-name MemoryDeleteEvent --zip-file fileb://memory-delete-event.zip

text_events:
	cd functions && zip ../memory-text-events.zip text_events.py
	aws lambda update-function-code --function-name MemoryTextEvents --zip-file fileb://memory-text-events.zip

test:
	.venv/bin/pytest ./tests/*tests.py

clean_zip:
	rm memory-login.zip
	rm memory-layer.zip
	cd layer && rm -rf python
	rm memory-man-2.zip


clean_env:
	rm -rf .venv
	rm -rf .pytest_cache