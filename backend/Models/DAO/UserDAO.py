import mysql.connector
from Models.BIN.User import User

class UserDAO:
    def __init__(self):
        self.connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='test_chess'
        )

    def get_all_users(self):
        """
        Lấy danh sách tất cả người dùng từ cơ sở dữ liệu và trả về mảng đối tượng User.
        """
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM tbluser")
        users_data = cursor.fetchall()
        cursor.close()

        # Tạo mảng đối tượng User từ dữ liệu
        users = []
        for user_data in users_data:
            user = User(user_data[0], user_data[1], user_data[2])
            users.append(user)

        return users
    def check_login(self, username, password):
        cursor = self.connection.cursor()
        query = "SELECT * FROM tbluser WHERE userName = %s AND userPassword = %s"
        cursor.execute(query, (username, password))
        user_data = cursor.fetchone()
        cursor.close()

        if user_data:
            user = User(user_data[0], user_data[10], user_data[9])
            return user
        else:
            return None