import requests
url = "http://172.20.10.3"
data = "7"
timeout_seconds = 0.5  # Set the timeout to 5 seconds
try:
    requests.post(url, data=data, timeout=timeout_seconds)
except requests.exceptions.Timeout:
    print("The request timed out after", timeout_seconds, "seconds.")
except requests.exceptions.RequestException as e:
    print("An error occurred during the request:", str(e))