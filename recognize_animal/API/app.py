from flask import Flask, jsonify, request
import sys
sys.path.append("..")  # Thêm đường dẫn tới thư mục chính (backend) để import các module trong đó

from flask_cors import CORS

app = Flask(__name__)

CORS(app)

from Controllers.UserController import UserController  
from Controllers.AnimalController import AnimalController  


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




if __name__ == "__main__":
    app.run(debug=True)