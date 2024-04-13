from flask import Flask, jsonify, request
import sys
sys.path.append("..")  # Thêm đường dẫn tới thư mục chính (backend) để import các module trong đó
import os
from flask_cors import CORS
from pyrebase import pyrebase
import cv2
import urllib.request
import numpy as np
import tkinter as tk
from tkinter import Canvas, messagebox
from PIL import Image, ImageTk
import subprocess 


app = Flask(__name__)

CORS(app)

from Controllers.UserController import UserController  
from Controllers.AnimalController import AnimalController  
temp_file_path = ""
# Firebase configuration
config = {
  "apiKey": "AIzaSyBLMG4Qh98crk72trlnDrcxlm7aZtu8Nqw",
  "authDomain": "rare-animals.firebaseapp.com",
  "projectId": "rare-animals",
  "storageBucket": "rare-animals.appspot.com",
  "messagingSenderId": "159269615182",
  "appId": "1:159269615182:web:e705494cfdf87e0d7bb51f",
  "measurementId": "G-TV60MHH5M4",
  "serviceAccount": "serviceAccount.json",
  "databaseURL": "https://rare-animals-default-rtdb.firebaseio.com/"
}
# Initialize Firebase
firebase = pyrebase.initialize_app(config)
# Access Firebase Storage
storage = firebase.storage()

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



url = 'http://192.168.43.8/cam-lo.jpg'
temp_file_path = ""
server_url = ""
photo = None
root = None
canvas = None
is_server_running = False
def start_server():
    subprocess.Popen("python app.py", shell=True)

def restart_server():
    subprocess.Popen("python app.py", shell=True)

def stop_application():
    global root, canvas, photo
    if root:
        root.quit()
    root = None
    canvas = None
    photo = None

def capture_and_update(canvas):
    global url, photo, root
    try:
        img = urllib.request.urlopen(url)
        img_np = np.array(bytearray(img.read()), dtype=np.uint8)
        frame = cv2.imdecode(img_np, -1)
        
        # Convert frame from OpenCV to a format that can be displayed on tkinter
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        img = Image.fromarray(frame)
        photo = ImageTk.PhotoImage(image=img)
        canvas.create_image(0, 0, anchor=tk.NW, image=photo)
        
        # Repeat this process every 10ms
        root.after(10, capture_and_update, canvas)
        
    except Exception as e:
        print("Error:", e)
        messagebox.showerror("Error", "An error occurred while capturing and displaying the image.")

def capture_and_send(canvas):
    global temp_file_path
    animal_controller = AnimalController()

    try:
        req = urllib.request.urlopen(url)
        arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
        img = cv2.imdecode(arr, -1)

        temp_file_path = "D:/VisualStudioCode/Project/Identify_rare_animals/recognize_animal/FileUpload/temp.jpg"
        cv2.imwrite(temp_file_path, img)
        file_path = "temp.jpg"
        cv2.imwrite(file_path, img)

        storage.child(file_path).put(file_path)

        auth = firebase.auth()
        email = "nguyenducvan260903@gmail.com"
        password = "123456"
        user = auth.sign_in_with_email_and_password(email, password)
        url_image = storage.child(file_path).get_url(user["idToken"])

        result_tuple = animal_controller.predict_animal_label(temp_file_path)

        if result_tuple is not None:
            predicted_label = result_tuple['predicted_label']['predicted_label']
            confidence = result_tuple['predicted_label']['confidence']

            result_dict = {
                "predicted_label": predicted_label,
                "confidence": confidence,
                "url_image": url_image
            }
        else:
            result_dict = {
                "error": "Result tuple is None"
            }
        print(result_dict)
        return result_dict

    except Exception as e:
        print("Error:", e)
        messagebox.showerror("Error", "An error occurred while capturing and predicting the animal.")

@app.route("/recognize_animal", methods=["POST"])
def recognize_animal():
    global root, canvas, photo, url, temp_file_path
    
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
    
    data = request.json
    if 'recognize' not in data:
        return jsonify({"error": "'recognize' is required"}), 400
    
    recognize = data['recognize']
    
    if recognize == "true":
        try:
            if root is not None:
                return jsonify({"error": "Session is running, please stop before starting a new one"}), 400
            
            root = tk.Tk()
            root.title("Display Video from URL")
            
            canvas = tk.Canvas(root, width=640, height=480)
            canvas.pack()

            capture_and_update(canvas)

            stop_button = tk.Button(root, text="Capture", command=stop_application)
            stop_button.pack()

            root.mainloop()
            
            result = capture_and_send(canvas)
            restart_server()
            return jsonify(result)
            
        except Exception as e:
            print("Error:", e)
            return jsonify({"error": "An error occurred while processing the image"}), 500
    
    else:
        return jsonify({"message": "'Recognize' is not True"}), 400



if __name__ == "__main__":
    app.run(debug=True)