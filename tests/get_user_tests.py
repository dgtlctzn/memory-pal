import os

from ..functions.get_user import SqlConnect

database = 'memory_db'
local_host = 'localhost'
local_user = 'root'
local_password = os.getenv('LOCAL_PASS')

db = SqlConnect(local_host, local_user, local_password, database)


def test_user_info_expect_dict_of_length_4():
    res = db.get_user('test@user.com')
    assert type(res) == dict and len(res) == 4
