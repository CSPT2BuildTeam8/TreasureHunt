from django.shortcuts import render
import requests


url = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/init/'
headers = {'Authorization: Token 1d3bf19c005fb5358c547744fe9d22abd1df8fd5'}
r = requests.get(url, headers=headers)
def home(request):
    response = requests.get('url')
    treasureisland = response.json()
    return render(request, 'core/home.html', {
        'room_id': treasureisland['room_id'],
        'title': treasureisland['title']
    })