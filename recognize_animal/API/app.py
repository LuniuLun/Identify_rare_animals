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
from urllib.request import urlretrieve
import requests
import subprocess 
import time

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

# @app.route("/recognize_animal", methods=["POST"])
# def recognize_animal():
#     if 'image_url' not in request.json:
#         return jsonify({"error": "No image URL provided"}), 400
    
#     image_url = request.json['image_url']
#     animal_controller = AnimalController()
    
#     try:
#         req = urllib.request.urlopen(image_url)
#         arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
#         img = cv2.imdecode(arr, -1)

#         temp_file_path = "D:/VisualStudioCode/Project/Identify_rare_animals/recognize_animal/FileUpload/temp.jpg"
#         cv2.imwrite(temp_file_path, img)
#         file_path = "temp.jpg"
#         cv2.imwrite(file_path, img)

#         storage.child(file_path).put(file_path)

#         auth = firebase.auth()
#         email = "nguyenducvan260903@gmail.com"
#         password = "123456"
#         user = auth.sign_in_with_email_and_password(email, password)
#         url_image = storage.child(file_path).get_url(user["idToken"])

#         result_tuple = animal_controller.predict_animal_label(temp_file_path)

#         if result_tuple is not None:
#             predicted_label = result_tuple['predicted_label']['predicted_label']
#             confidence = result_tuple['predicted_label']['confidence']

#             result_dict = {
#                 "predicted_label": predicted_label,
#                 "confidence": confidence,
#                 "url_image": url_image
#             }
#         else:
#             result_dict = {
#                 "error": "Result tuple is None"
#             }
#         print(result_dict)
#         return jsonify(result_dict)
#     except Exception as e:
#         print("Error:", e)
#         messagebox.showerror("Error", "An error occurred while capturing and predicting the animal.")
#     return jsonify({"message": "'Recognize' is not True"}), 400

animals = [
    {"id": "1", "scientific_name": "Neofelis nebulosa"},
    {"id": "2", "scientific_name": "Lophura hatinhensis"},
    {"id": "3", "scientific_name": "Graphium antiphates"},
    {"id": "4", "scientific_name": "Ciconia episcopus"},
    {"id": "5", "scientific_name": "Eretmochelys imbricata"},
    {"id": "6", "scientific_name": "Pavo muticus"},
    {"id": "7", "scientific_name": "Rhincodon typus"},
    {"id": "8", "scientific_name": "Prionailurus viverrinus"},
    {"id": "9", "scientific_name": "Lutrogale perspicillata"},
    {"id": "10", "scientific_name": "Saundersilarus saundersi"},
    {"id": "11", "scientific_name": "Phodilus badius"},
    {"id": "12", "scientific_name": "Tragulus napu"},
    {"id": "13", "scientific_name": "Caloenas nicobarica nicobarica"},
    {"id": "14", "scientific_name": "Ardeotis nigriceps"},
]
# Hàm để tìm ID dựa trên tên khoa học
def get_id_by_scientific_name(scientific_name):
    for animal in animals:
        if animal['scientific_name'] == scientific_name:
            return animal['id']
    return None
@app.route("/recognize_animal", methods=["POST"])
def recognize_animal():
    try:
        if 'image_url' not in request.json:
            return jsonify({"error": "Không có URL hình ảnh"}), 400

        image_url = request.json['image_url']
        # Xác thực với Firebase
        auth = firebase.auth()
        email = "nguyenducvan260903@gmail.com"
        password = "123456"
        user = auth.sign_in_with_email_and_password(email, password)

        # Tải và xử lý hình ảnh
        req = urllib.request.urlopen(image_url)
        arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
        img = cv2.imdecode(arr, -1)

        temp_file_path = "D:/VisualStudioCode/Project/Identify_rare_animals/recognize_animal/FileUpload/temp.jpg"
        cv2.imwrite(temp_file_path, img)
        file_path = "temp.jpg"
        cv2.imwrite(file_path, img)

        # Đổi tên tập tin hình ảnh
        file_name = "temp_" + str(time.time()) + ".jpg"
        # Tải lên hình ảnh lên Firebase Storage
        storage = firebase.storage()
        storage.child(file_name).put(temp_file_path)
        url_image = storage.child(file_name).get_url(user["idToken"])

        # Thực hiện nhận diện động vật
        animal_controller = AnimalController()
        result_tuple = animal_controller.predict_animal_label(temp_file_path)

        if result_tuple is not None:
            predicted_label = result_tuple['predicted_label']['predicted_label']
            print(predicted_label)
            confidence = result_tuple['predicted_label']['confidence']
            confidence_without_percentage = int(float(confidence.replace('%', '')))  # Convert to float first, then to int
            print(confidence_without_percentage)  # Outputs: 74
            if(confidence_without_percentage >= 75):
                id_animal = get_id_by_scientific_name(predicted_label)
                print(id_animal)
                url = "http://172.20.10.3/"
                # Convert the ID to a string and send it as a POST request
                timeout_seconds = 0.5  # Set the timeout to 0.5 seconds
                try:
                    # Send the ID as a form-encoded request
                    response = requests.post(url, data=str(id_animal), timeout=timeout_seconds)
                    response.raise_for_status()  # Check for HTTP request errors
                except requests.exceptions.Timeout:
                    print("The request timed out after", timeout_seconds, "seconds.")
                except requests.exceptions.RequestException as e:
                    print("An error occurred during the request:", str(e))
            
            result_dict = {
                "predicted_label": predicted_label,
                "confidence": confidence,
                "url_image": url_image
            }
        else:
            result_dict = {"error": "Tuple kết quả là None"}

        return jsonify(result_dict)

    except Exception as e:
        # Ghi log lỗi hoặc trả về trong phản hồi JSON
        print("Lỗi:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    try:
        app.run(debug=True)
    except Exception as e:
        print("Error:", e)
        # Tải lại máy chủ
        print("Reloading server...")
        python = sys.executable
        os.execl(python, python, *sys.argv)