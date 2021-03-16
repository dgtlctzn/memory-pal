import json
import os

from ..functions.signup import SqlConnect

database = 'memory_db'
local_host = 'localhost'
local_user = 'root'
local_password = os.getenv('LOCAL_PASS')


def test_false_if_signup_user_exists():
    sql = SqlConnect(local_host, local_user, local_password, database)
    assert not sql.signup('test@user.com', 'Test User', user_pass='katsu', user_phone=4043583607)
