import os
from datetime import date

import telnyx
from dotenv import load_dotenv
from mysql.connector import connect, Error

load_dotenv()

host = os.getenv('MYSQL_HOST')
user = os.getenv('MYSQL_USER')
password = os.getenv('MYSQL_PASS')
database = 'memory_db'

telnyx.api_key = os.getenv('TELNYX_API_KEY')
telnyx_number = os.getenv('TELNYX_NUMBER')


def parents_day(my_month, first, last):
    def get_day(my_year):
        for i in range(first, last):
            if date(year=my_year, month=my_month, day=i).isoweekday() == 7:
                return date(year=my_year, month=my_month, day=i)
    return get_day


class SendText:

    def __init__(self, number):
        self.__client = telnyx
        self.__phone_number = number

    def text(self, phone, message):
        self.__client.Message.create(
            to=f"+1{phone}",
            from_=self.__phone_number,
            text=message
        )

    @staticmethod
    def number_str(number):
        digit_2 = number % 10
        if digit_2 == 3:
            num_str = 'rd'
        elif digit_2 == 2:
            num_str = 'nd'
        elif digit_2 == 1:
            num_str = 'st'
        else:
            num_str = 'th'
        return str(number) + num_str

    def text_by_type(self, event_type, name, days_till, phone, message, age):
        day_str = 'day' if days_till == 1 else 'days'

        if event_type == 'Birthday':
            if days_till:
                text_message = f'''
                {days_till} more {day_str} till it\'s {name}'s birthday! {name} will be {age} years old. {message}
                '''
                self.text(phone, text_message)
            else:
                text_message = f'It\'s {name}\'s {self.number_str(age)} birthday today!'
                self.text(phone, text_message)
        elif event_type == 'Holiday':
            if days_till:
                text_message = f'''
                {days_till} more {day_str} till {name}! {message}
                '''
                self.text(phone, text_message)
            else:
                text_message = f'Happy {name}!'
                self.text(phone, text_message)
        elif event_type == 'Cancel Subscription':
            if days_till:
                text_message = f'''
                Remember to cancel your {name} subscription in {days_till} {day_str}! {message}
                '''
                self.text(phone, text_message)
            else:
                text_message = f'Remember to cancel your {name} subscription today!'
                self.text(phone, text_message)
        elif event_type == 'Father\'s Day' or event_type == 'Mother\'s Day':
            if days_till:
                text_message = f'''
                {event_type} is coming up in {days_till} {day_str}! {message}
                '''
                self.text(phone, text_message)
            else:
                text_message = f'''
                It\'s {name} today! Wish your {'Dad' if event_type == "Father's Day" else 'Mom'} a good one.
                '''
                self.text(phone, text_message)
        elif event_type == 'User Birthday':
            text_message = 'Happy Birthday from Memory Pal!'
            self.text(phone, text_message)
        else:
            if days_till:
                text_message = f'''
                {days_till} {day_str} till your {name}. {message}
                '''
                self.text(phone, text_message)
            else:
                text_message = f'''
                Today is your {name}!
                '''
                self.text(phone, text_message)


class SqlConnect:

    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database

    def get_events(self, today, fathers_day, mothers_day):
        with connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database
        ) as cnx:
            with cnx.cursor() as cursor:
                now = today.strftime('%Y-%m-%d')
                text_events_query = f"""
                SELECT Users.phone, Days.name, Days.type, Events.days_till, Events.date, Days.message
                FROM Users
                INNER JOIN Days
                ON Days.user_id = Users.id
                INNER JOIN Events
                ON Events.days_id = Days.id
                WHERE ((Days.type = "Birthday" OR Days.type = "Holiday" OR ((Days.type = "Other" OR Days.type = "User Birthday") AND Days.recurring = TRUE))
                AND DAY(Events.date) = "{today.day}" AND MONTH(Events.date) = "{today.month}" )
                OR ((Days.type = "Cancel Subscription" OR (Days.type = "Other" AND Days.recurring = FALSE))
                AND DATE(Events.date) = "{now}" )
                OR (Days.type = "Father's Day"
                AND DATE_ADD( "{fathers_day}", INTERVAL -Events.days_till DAY) =  "{now}" )
                OR (Days.type = "Mother's Day"
                AND DATE_ADD( "{mothers_day}", INTERVAL -Events.days_till DAY) =  "{now}" );
                """
                cursor.execute(text_events_query)
                return cursor.fetchall()


def lambda_handler(event, context):
    try:
        curr_year = date.today().year
        now = date.today()

        get_fathers_day = parents_day(6, 15, 22)
        get_mothers_day = parents_day(5, 8, 15)
        fathers_day = get_fathers_day(curr_year)
        mothers_day = get_mothers_day(curr_year)

        sql = SqlConnect(host, user, password, database)
        results = sql.get_events(now, fathers_day, mothers_day)

        st = SendText(telnyx_number)
        for result in results:
            phone, name, event_type, days_till, birth_date, message = result
            st.text_by_type(event_type, name, days_till, phone, message, curr_year - birth_date.year)

    except (Error, Exception) as e:
        print(e)


if __name__ == '__main__':
    lambda_handler(None, None)
