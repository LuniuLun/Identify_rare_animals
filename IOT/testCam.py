# 
import cv2
import urllib.request
import numpy as np
import tkinter as tk
from tkinter import messagebox
from PIL import Image, ImageTk
import webbrowser
import requests
import tempfile
import os

url = 'http://192.168.100.235/cam-lo.jpg'
server_url = 'http://127.0.0.1:5000/predict_animal'

def capture_and_update():
    global photo
    try:
        img = urllib.request.urlopen(url)
        img_np = np.array(bytearray(img.read()), dtype=np.uint8)
        frame = cv2.imdecode(img_np, -1)
        
        # Chuyển đổi frame từ OpenCV sang định dạng có thể hiển thị trên tkinter
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        img = Image.fromarray(frame)
        photo = ImageTk.PhotoImage(image=img)
        canvas.create_image(0, 0, anchor=tk.NW, image=photo)
        
        # Lặp lại quá trình này mỗi 10ms
        root.after(10, capture_and_update)
        
    except Exception as e:
        print("Error:", e)
        messagebox.showerror("Lỗi", "Đã xảy ra lỗi khi chụp và hiển thị ảnh")

def capture_and_send():
    try:
        img = urllib.request.urlopen(url)
        img_np = np.array(bytearray(img.read()), dtype=np.uint8)
        frame = cv2.imdecode(img_np, -1)
        
        # Lưu ảnh vào một tệp tạm thời
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')
        cv2.imwrite(temp_file.name, frame)
        
        # Mở tệp ảnh đã chụp
        webbrowser.open(temp_file.name)
        
        # Gửi ảnh đến server
        files = {'image': open(temp_file.name, 'rb')}
        response = requests.post(server_url, files=files)
        
        # Xóa tệp tạm thời sau khi gửi
        os.unlink(temp_file.name)

        print(response.data.predicted_label.predicted_label)
        if response.status_code == 200:
            messagebox.showinfo("Thành công", "Ảnh đã được gửi đến server")
        else:
            messagebox.showerror("Lỗi", "Không thể gửi ảnh đến server")
            
    except Exception as e:
        print("Error:", e)
        messagebox.showerror("Lỗi", "Đã xảy ra lỗi khi chụp và gửi ảnh")

def stop_application():
    root.quit()

root = tk.Tk()
root.title("Hiển thị video từ URL")

# Tạo một canvas để hiển thị ảnh
canvas = tk.Canvas(root, width=640, height=480)
canvas.pack()

# Bắt đầu quá trình chụp và cập nhật ảnh
capture_and_update()

# Nút chụp ảnh và gửi đến server
capture_button = tk.Button(root, text="Chụp và Gửi ảnh", command=capture_and_send)
capture_button.pack()

# Nút dừng ứng dụng
stop_button = tk.Button(root, text="Dừng ứng dụng", command=stop_application)
stop_button.pack()

root.mainloop()
