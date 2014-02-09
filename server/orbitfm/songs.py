class Songs(object):
    def __init__(self, title, duration, url, *args, **kwargs):
        self.title = title
        self.duration = duration
        self.url = url

    def is_within_bounds(self, duration, error=0.5):
        return duration - error < self.duration < duration + error
