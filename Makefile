layer:
	pip install -r requirements.txt -t ./layer/python/lib/python3.8/site-packages
	cd layer && zip -r ../memory-layer.zip *

main:
	cd functions && zip ../memory-man-2.zip memory.py
	aws lambda update-function-code --function-name MemoryMan --zip-file fileb://memory-man-2.zip

login:
	cd functions && zip ../memory-login.zip login.py
	aws lambda update-function-code --function-name MemoryLogin --zip-file fileb://memory-login.zip

test:
	.venv/bin/pytest ./tests/tests.py

clean:
	rm -rf memory-man-2.zip
	rm -rf memory-login.zip

