import pyen

en = pyen.Pyen("K6O0P8KO54K2GNOFE")

song = 'Wrecking Ball'
params = {
        'title':song,
        'results': 10,
        'bucket' : ['id:spotify-WW', 'tracks'],
        'limit' : True
}
response = en.get('song/search', **params)
songs = response['songs']
if len(songs) > 0:
	for song in songs:
		artist = song['artist_name']
		track = song['tracks'][0]
		track_id = track['foreign_id'].replace('-WW', '')
		print("song: ", song['title'])
		print("track: ", track_id)
		print("artist ", artist)
		print("-----------------")
else:
	print("Can't find any songs")
 

# usage: python spotify_play.py 
