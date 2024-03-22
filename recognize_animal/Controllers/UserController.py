from Models.BO.UserBO import UserBO

class UserController:
    def __init__(self):
        self.user_dao = UserBO()

    def get_all_users(self):
        """
        Lấy danh sách tất cả người dùng từ DAO và trả về dưới dạng JSON.
        """
        users = self.user_dao.get_all_users()
        users_json = []
        for user in users:
            user_json = {
                "id": user.get_id(),
                "name": user.get_name(),
                "email": user.get_email()
            }
            users_json.append(user_json)
        return users_json
    
    def check_login(self, username, password):
        user = self.user_dao.check_login(username, password)
        if user != None:            
            return {
                "id": user.get_id(),
                "name": user.get_name(),
                "email": user.get_email()
            }
        else:
            return None