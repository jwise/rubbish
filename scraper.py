import requests
from bs4 import BeautifulSoup
import re

def url_to_tracklist(url):
  r = requests.get(url)
  soup = BeautifulSoup(r.text)
  
  return \
    [ 
      { "artist": track.find_all("td")[0].get_text(),
        "title": track.find_all("td")[1].get_text(),
        "req": True if re.match(r'.*\*.*', track.find_all("td")[2].get_text(), flags=re.S) else False
      }
      for track in soup.find(id="PlayGrid").find_all("tr")[1:]
    ]

def get_tracklists():
  r = requests.get("http://www.darkdb.com/deathguild/DateList.aspx")
  soup = BeautifulSoup(r.text)
  
  return \
    { re.match(r'.*=(.*)', a['href']).group(1):
        "http://www.darkdb.com/deathguild/" + a['href']
      for a in soup.find_all("a")
    }
