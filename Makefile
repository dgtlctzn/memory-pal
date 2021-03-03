build:
	virtualenv --python=python3.8 .venv

layer:
	pip freeze > requirements.txt
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

test:
	.venv/bin/pytest ./tests/tests.py

clean_zip:
	rm memory-login.zip
	rm memory-layer.zip
	cd layer && rm -rf python
	rm memory-man-2.zip


clean_env:
	rm -rf .venv
	rm -rf .pytest_cache