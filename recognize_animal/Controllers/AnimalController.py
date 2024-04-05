from Models.BO.UserBO import UserBO
from Models.BO.AnimalBO import AnimalBO

class AnimalController:
    def __init__(self):
        self.animal_bo = AnimalBO()

    def predict_animal_label(self, image_path):
        predicted_label = self.animal_bo.predict_animal(image_path)
        return {"predicted_label": predicted_label}