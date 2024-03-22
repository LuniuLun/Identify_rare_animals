from Models.DAO.UserDAO import UserDAO

class UserBO:
    def __init__(self):
        self.user_dao = UserDAO()

    def get_all_users(self):
        return self.user_dao.get_all_users()

    def check_login(self, username, password):
        return self.user_dao.check_login(username, password)
