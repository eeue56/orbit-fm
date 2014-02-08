from orbitfm.helpers import *

def assert_exception(func, exception, *args, **kwargs):
    try:
        func(*args, **kwargs)
    except exception:
        return True
    
    return False


def test_parse():

    assert parse_message('f ') == ('f', '')
    #assert assert_exception(parse_message, ValueError, 'f')
    assert parse_message('f f') == ('f', 'f')
    assert parse_message('f f f f') == ('f', 'f f f')


def test_all():
    test_parse()
    test_search_youtube()

if __name__ == '__main__':
    test_all()