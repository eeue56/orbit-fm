import pyen

en = pyen.Pyen("K6O0P8KO54K2GNOFE")

artist = 'Miley Cyrus'
params = {
 
	'type':'artist', 
        'artist':artist,
        'results': 10,
        'bucket' : ['id:spotify-WW', 'tracks'],
        'limit' : True
}
response = en.get('playlist/static', **params)
songs = response['songs']
if len(songs) > 0:
        for song in songs:
        	track = song['tracks'][0]
        	track_id = track['foreign_id'].replace('-WW', '')
        	print(song['title'])
        	print(track_id)
else:
        print("Can't find any songs")
 

# usage: python spotify_play.py 
