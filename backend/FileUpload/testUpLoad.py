from pyrebase import pyrebase

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

# Local file path
my_image = "temp.jpg"

# Upload image to Firebase Storage
storage.child(my_image).put(my_image)

print("Image uploaded successfully!")

auth = firebase.auth()
email = "nguyenducvan260903@gmail.com"
password = "123456"
user = auth.sign_in_with_email_and_password(email, password)
url = storage.child(my_image).get_url(user["idToken"])
print(url)
