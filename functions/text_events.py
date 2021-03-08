import json
import os
from datetime import date

from dotenv import load_dotenv
from mysql.connector import connect, Error
from twilio.rest import Client

load_dotenv()

host = os.getenv('MYSQL_HOST')
user = os.getenv('MYSQL_USER')
password = os.getenv('MYSQL_PASS')
database = 'memory_db'

twilio_SID = os.getenv('TWILIO_SID')
twilio_auth = os.getenv('TWILIO_AUTH')
twilio_number = os.getenv('TWILIO_NUMBER')


def parents_day(my_month, first, last):
    def get_day(my_year):
        for i in range(first, last):
            if date(year=my_year, month=my_month, day=i).isoweekday() == 7:
                return date(year=my_year, month=my_month, day=i)
    return get_day


class SendText:

    def __init__(self, number, sid, auth):
        self.__client = Client(sid, auth)
        self.__phone_number = number

    def text(self, phone, message):
        self.__client.messages.create(
            to=phone,
            from_=self.__phone_number,
            body=message
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

        if event_type == 'Birthday':
            if days_till:
                text_message = f'''
                {days_till} more days till it\'s {name}'s birthday!
                They will be {age} years old.
                {message}
                '''
                self.text(phone, text_message)
            else:
                text_message = f'It\'s {name}\'s {self.number_str(age)} birthday today!'
                self.text(phone, text_message)
        elif event_type == 'Holiday':
            if days_till:
                text_message = f'''
                {days_till} more days till {name}!
                {message}
                '''
                self.text(phone, text_message)
            else:
                text_message = f'Happy {name}!'
                self.text(phone, text_message)
        elif event_type == 'Cancel Subscription':
            if days_till:
                text_message = f'''
                Remember to cancel your {name} subscription in {days_till} days!
                {message}
                '''
                self.text(phone, text_message)
            else:
                text_message = f'Remember to cancel your {name} subscription today!'
                self.text(phone, text_message)
        elif event_type == 'Father\'s Day' or event_type == 'Mother\'s Day':
            if days_till:
                text_message = f'''
                {event_type} is coming up in {days_till} days!
                {message}
                '''
                self.text(phone, text_message)
            else:
                text_message = f'''
                It\'s {name} today! 
                Wish your {'Dad' if event_type == "Father's Day" else 'Mom'} a good one.
                '''
                self.text(phone, text_message)
        else:
            self.text(phone, message)


def lambda_handler(event, context):
    try:
        curr_year = date.today().year

        get_fathers_day = parents_day(6, 15, 22)
        get_mothers_day = parents_day(5, 8, 15)
        fathers_day = get_fathers_day(curr_year)
        mothers_day = get_mothers_day(curr_year)

        with connect(
            host=host,
            user=user,
            password=password,
            database=database
        ) as cnx:
            with cnx.cursor() as cursor:
                parents_days = (fathers_day, mothers_day)
                text_events_query = """
                SELECT Users.phone, Days.name, Days.type, Events.days_till, Events.date, Days.message
                FROM Users
                INNER JOIN Days
                ON Days.user_id = Users.id
                INNER JOIN Events
                ON Events.days_id = Days.id
                WHERE ((Days.type = "Birthday" OR Days.type = "Holiday")
                AND DAY(Events.date) = DAY(CURDATE()) AND MONTH(Events.date) = MONTH(CURDATE()))
                OR (Days.type = "Cancel Subscription"
                AND DATE(Events.date) = CURDATE())
                OR (Days.type = "Father's Day"
                AND DATE_ADD( %s, INTERVAL -Events.days_till DAY) = CURDATE())
                OR (Days.type = "Mother's Day"
                AND DATE_ADD( %s, INTERVAL -Events.days_till DAY) = CURDATE());
                """ % parents_days
                cursor.execute(text_events_query)

                st = SendText(twilio_number, twilio_SID, twilio_auth)
                for result in cursor.fetchall():
                    phone, name, event_type, days_till, birth_date, message = result
                    st.text_by_type(event_type, name, days_till, phone, message, curr_year - birth_date.year)

    except (Error, Exception) as e:
        print(e)


if __name__ == '__main__':
    lambda_handler(None, None)
