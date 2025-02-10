from datetime import datetime, timedelta


def get_next_year_date():
    return datetime.now().date() + timedelta(days=365)
