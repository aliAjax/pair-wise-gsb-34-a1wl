import calendar
import re
from datetime import date

MONTH_PATTERN = re.compile(r"^\d{4}-(0[1-9]|1[0-2])$")

def audit_target(kind, id):
    return f"{kind}#{id}"

def is_valid_month(month):
    return isinstance(month, str) and bool(MONTH_PATTERN.match(month))

def parse_date(value):
    if not isinstance(value, str) or len(value) < 10:
        return None
    try:
        return date.fromisoformat(value[:10])
    except ValueError:
        return None

def in_month(value, month):
    parsed = parse_date(value)
    return parsed is not None and parsed.isoformat()[:7] == month

def month_end(month):
    year, mon = int(month[:4]), int(month[5:7])
    return date(year, mon, calendar.monthrange(year, mon)[1])

def next_month(month):
    year, mon = int(month[:4]), int(month[5:7])
    return f"{year + 1}-01" if mon == 12 else f"{year}-{mon + 1:02d}"
