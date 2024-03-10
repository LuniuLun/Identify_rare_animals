class User:
    def __init__(self, id, name, email):
        self.id = id
        self.name = name
        self.email = email

    # Getter và setter cho id
    def get_id(self):
        return self.id

    def set_id(self, id):
        self.id = id

    # Getter và setter cho name
    def get_name(self):
        return self.name

    def set_name(self, name):
        self.name = name

    # Getter và setter cho email
    def get_email(self):
        return self.email

    def set_email(self, email):
        self.email = email
