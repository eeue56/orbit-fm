from orbitfm.helpers import *

def assert_exception(func, exception, *args, **kwargs):
    try:
        func(*args, **kwargs)
    except exception:
        return True
    else:
        return False


def test_parse():

    assert parse_message('f ') == ('f', '')

    assert assert_exception(parse_message, IndexError, 'f')