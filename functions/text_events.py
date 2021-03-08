import datetime as dt


def parents_day(my_month, first, last):
    def get_day(my_year):
        for i in range(first, last):
            if dt.date(year=my_year, month=my_month, day=i).isoweekday() == 7:
                return dt.date(year=my_year, month=my_month, day=i)
    return get_day


def days_diff(first, second):
    """returns negative number if second event comes before first"""
    new_date = dt.date(year=first.year, month=second.month, day=second.day)
    return (new_date - first).days
