FROM python:3.10-slim

WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create an api_server directory
RUN mkdir /app/api_server

# Copy the rest of the application into api_server
COPY . /app/api_server/

# Run the application by referencing the package correctly
CMD sh -c "uvicorn api_server.main:app --host 0.0.0.0 --port ${PORT:-8080}"
