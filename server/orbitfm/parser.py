from helpers import parse_message


OKAY = 'ok'
ERROR = 'err'

def parse_command(message):

    function_name, arguments = parse_message(message)

    if function_name in functions:
        functions['function_name'](arguments)

    

