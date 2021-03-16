import os
from datetime import date

from ..functions.text_events import SqlConnect, parents_day

host = 'localhost'
user = 'root'
password = os.getenv('LOCAL_PASS')
database = 'memory_db'


def test_future_mothers_day():
    test_day_2025 = date(year=2025, month=5, day=11)
    seven_days_before_2025 = date(year=2025, month=5, day=4)

    test_day_2028 = date(year=2028, month=5, day=14)
    seven_days_before_2028 = date(year=2028, month=5, day=7)

    get_mothers_day = parents_day(5, 8, 15)
    _ = date.today()

    mothers_day_2025 = get_mothers_day(2025)
    mothers_day_2028 = get_mothers_day(2028)

    sql = SqlConnect(host, user, password, database)

    res_0_2025 = sql.get_events(test_day_2025, _, mothers_day_2025)
    res_7_2025 = sql.get_events(seven_days_before_2025, _, mothers_day_2025)

    res_0_2028 = sql.get_events(test_day_2028, _, mothers_day_2028)
    res_7_2028 = sql.get_events(seven_days_before_2028, _, mothers_day_2028)

    assert len(res_0_2025) == 1 and len(res_7_2025) == 1 and len(res_0_2028) == 1 and len(res_7_2028) == 1