from flask import Flask, jsonify, request
import sys
sys.path.append("..")  # Thêm đường dẫn tới thư mục chính (backend) để import các module trong đó

from flask_cors import CORS

import cv2
import urllib.request
import numpy as np
import tkinter as tk
from tkinter import Canvas, messagebox
from PIL import Image, ImageTk
import webbrowser
import requests
import tempfile
import os


app = Flask(__name__)

CORS(app)

from Controllers.UserController import UserController  
from Controllers.AnimalController import AnimalController  
temp_file_path = ""


@app.route("/users", methods=["GET"])
def get_users():
    user_controller = UserController()
    users = user_controller.get_all_users()
    return jsonify(users)

@app.route("/login", methods=["POST"])
def login():
    user_controller = UserController()
    
    # Kiểm tra nếu request không phải là JSON
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
    
    data = request.json
    if 'username' not in data or 'password' not in data:
        return jsonify({"error": "Username and password are required"}), 400
    
    name = data['username']
    password = data['password']
    print(name + password)
    return jsonify(user_controller.check_login(name, password))

@app.route("/predict_animal", methods=["POST"])
def predict_animal():
    if 'image' not in request.files:
        return jsonify({"error": "No file part"}), 400

    animal_controller = AnimalController()
    file = request.files['image']
    

    image_path = "D:\VisualStudioCode\Project\Identify_rare_animals\\recognize_animal\FileUpload\\temp.jpg"  # Tạo đường dẫn tạm thời cho ảnh
    file.save(image_path)
    result = animal_controller.predict_animal_label(image_path)
    return jsonify(result)  # Sử dụng jsonify để trả về response JSON



url = 'http://192.168.100.235/cam-lo.jpg'
temp_file_path = ""
server_url = ""
photo = None
root = None
canvas = None

@app.route("/recognize_animal", methods=["POST"])
def recognize_animal():
    global url, temp_file_path, server_url, photo, root, canvas
    
    # Kiểm tra nếu request không phải là JSON
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
    
    data = request.json
    if 'recognize' not in data:
        return jsonify({"error": "'recognize' is required"}), 400
    
    recognize = data['recognize']
    
    # Kiểm tra giá trị của biến recognize
    if recognize == "true":
        try:
            if root is None:
                root = tk.Tk()
                root.title("Hiển thị video từ URL")
                
                # Tạo một canvas để hiển thị ảnh
                canvas = tk.Canvas(root, width=640, height=480)
                canvas.pack()

                # Bắt đầu quá trình chụp và cập nhật ảnh
                capture_and_update(canvas)

                # # Nút chụp ảnh và gửi đến server
                # capture_button = tk.Button(root, text="Chụp và Gửi ảnh", command=lambda: capture_and_send(canvas))
                # capture_button.pack()

                # Nút dừng ứng dụng
                stop_button = tk.Button(root, text="Capture", command=stop_application)
                stop_button.pack()

                root.mainloop()
                
                # Sau khi dừng mainloop, gọi hàm để capture và send ảnh
                result = capture_and_send(canvas)
                print(result)
                # Trả kết quả về client
                return jsonify(result)
            
        except Exception as e:
            print("Error:", e)
            return jsonify({"error": "An error occurred while processing the image"}), 500
    
    else:
        return jsonify({"message": "Recognize is not True"}), 400

def stop_application():
    global root
    if root:
        root.quit()

def capture_and_update(canvas):
    global url, photo, root
    
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
        root.after(10, capture_and_update, canvas)
        
    except Exception as e:
        print("Error:", e)
        messagebox.showerror("Lỗi", "Đã xảy ra lỗi khi chụp và hiển thị ảnh")

def capture_and_send(canvas):
    global temp_file_path
    
    animal_controller = AnimalController()
    
    try:
        # Mở camera và chụp ảnh
        req = urllib.request.urlopen(url)
        arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
        img = cv2.imdecode(arr, -1)
        
        # Lưu ảnh vào một tệp tạm thời với đường dẫn tuyệt đối
        temp_file_path = "D:/VisualStudioCode/Project/Identify_rare_animals/recognize_animal/FileUpload/temp.jpg"
        cv2.imwrite(temp_file_path, img)
        
        # Gọi hàm predict_animal_label từ animal_controller khi nhấn nút "Chụp ảnh"
        result = animal_controller.predict_animal_label(temp_file_path)
        
        # Trả kết quả về client
        return result
        
    except Exception as e:
        print("Error:", e)
        messagebox.showerror("Lỗi", "Đã xảy ra lỗi khi chụp và dự đoán loài động vật từ ảnh.")


if __name__ == "__main__":
    app.run(debug=True)