FROM ubuntu

RUN mkdir working
WORKDIR /working

COPY ./requirements.txt .

RUN apt-get update && apt-get -y install python3-pip zip

RUN mkdir dependency-layer && mkdir dependency-layer/python

RUN pip3 install -r requirements.txt -t ./dependency-layer/python

RUN zip -r ./memory-layer.zip ./dependency-layer
ENTRYPOINT ["tail", "-f", "/dev/null"]
