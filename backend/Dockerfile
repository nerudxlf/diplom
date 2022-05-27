FROM python:3
RUN apt-get update -y && apt-get install -y build-essential
WORKDIR /home/diplom/app/back
COPY ./ /home/diplom/app/back
RUN pip install -r requirements.txt