def parse_message(message):
    function = message[:message.index(' ')]
    args = message[message.index(''):]

    return (function, args)