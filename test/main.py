import http.client

# Define the target URL and path
host = "google.com"
path = "/"

print("Hello")

# Create an HTTP connection to the host
conn = http.client.HTTPSConnection(host)  # Use HTTPConnection for non-HTTPS URLs

# Send an HTTP GET request
conn.request("GET", path)

# Get the response
response = conn.getresponse()

print(response.status)
# Check the response status code (e.g., 200 for success)
if response.status < 400:
    # Read and print the response content
    data = response.read()
    print(data.decode('utf-8'))  # Assuming the response is in UTF-8 encoding

# Close the connection
conn.close()