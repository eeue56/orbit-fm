from orbitfm.helpers import *

def assert_exception(func, exception, *args, **kwargs):
    try:
        func(*args, **kwargs)
    except exception:
        print('exception')
        return True
    except e:
        print('raising')
        raise e
    else:
        print('here')
        return False


def test_parse():

    assert parse_message('f ') == ('f', '')
    #assert assert_exception(parse_message, ValueError, 'f')
    assert parse_message('f f') == ('f', 'f')
    assert parse_message('f f f f') == ('f', 'f f f')

def test_search_youtube():

    yt = search_youtube('dogs')
    keys = yt.keys()
    for key in keys:
        try:
            print(key)
        except:
            print('errored')

    key1 = key

    for key in yt[key1]:
        try:
            print(key)
        except:
            print('errored')

    key2 = key

    for key in yt[key2]:
        try:
            print(key)
        except:
            print('errored')



def test_all():
    test_parse()
    test_search_youtube()

if __name__ == '__main__':
    test_all()