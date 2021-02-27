package:
	cd .venv/lib/python3.8/site-packages && zip -r ../../../../memory-man-2.zip .
	zip -g memory-man-2.zip memory.py

deploy:
	aws lambda update-function-code --function-name MemoryMan --zip-file fileb://memory-man-2.zip
