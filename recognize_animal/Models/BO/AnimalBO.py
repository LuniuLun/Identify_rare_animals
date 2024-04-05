import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
from tensorflow.keras.models import load_model
import os

class AnimalBO:
    @staticmethod
    def predict_animal(image_path):
        # Load model
        model = load_model("D:\VisualStudioCode\Project\Identify_rare_animals\\recognize_animal\Models\BO\\trained_animal_model.keras")
        train_image_files_path = "D:\VisualStudioCode\Project\Identify_rare_animals\\recognize_animal\Models\Data\dataset_image/"
        # Đọc danh sách các thư mục trong đường dẫn train_image_files_path
        label = [f for f in os.listdir(train_image_files_path) if os.path.isdir(os.path.join(train_image_files_path, f))]
        label.sort()
        # Load and preprocess the image
        img = Image.open(image_path)
        img = img.resize((200, 200))
        img_array = np.array(img) / 255.0  # Normalize image

        img_array = np.expand_dims(img_array, axis=0)

        # Make prediction
        predictions = model.predict(img_array)
        predicted_label = label[np.argmax(predictions)]
        confidence = np.max(predictions) * 100

        # Create response dictionary
        response = {
            "predicted_label": predicted_label,
            "confidence": f"{confidence:.2f}%",
            "image_path": image_path
        }

        return response
