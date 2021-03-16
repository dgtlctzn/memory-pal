import json
import os

from ..functions.login import SqlConnect

database = 'memory_db'
local_host = 'localhost'
local_user = 'root'
local_password = os.getenv('LOCAL_PASS')

sql = SqlConnect(local_host, local_user, local_password, database)


def test_none_when_wrong_login_password():
    assert not sql.login('test@user.com', 'wrong password')


def test_none_when_login_no_user():
    assert not sql.login('notexists@user.com', 'password')


def test_dict_if_login_user_info_valid():
    res = sql.login('test@user.com', 'katsu')
    assert type(res) == dict and res.get('user_email') and res.get('user_name')
