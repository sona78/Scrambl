import requests
import pandas as pd
from bs4 import BeautifulSoup
import json

templateString = 'https://www.monster.com/jobs/search/?q={}&where={}'
def makeString(keywords, location):
    return templateString.format(keywords, location)

def buildDict(titleOfPosition, organization, location, link, salary, summ):
    newDict = {
        "title" : titleOfPosition,
        "company" : organization,
        "location" : location,
        "salary" : salary,
        "link" : link,
        "summary" : summ,
        "source" : 'Monster'
        }
    return newDict

def extractInformation(object1):
    
    try:
        title = object1.find('h2', class_='title').text.strip()
    except:
        title = ""
    try:
        organization = object1.find('div', class_='company').text.strip()
    except:
        organization = ""
    try: 
        link = object1.find('a').get('href')
        summ = link
    except:
        link = ""
        summ = ""
    try:
        location = object1.find('div', class_="location").text.strip()
    except:
        location = ""
    salary = ""
    return json.dumps(buildDict(title, organization, location, link, salary, summ))


def main1(position, location):
    newArr = []
    request1 = requests.get(makeString(position, location))
    if request1.ok:
        soup = BeautifulSoup(request1.text, 'html.parser')
        allJobsPopUps = soup.find(id='ResultsContainer')
        objects = allJobsPopUps.find_all('section', class_='card-content')
        
        for object1 in objects:
            newArr.append(extractInformation(object1))
        return newArr
    else:
        return ["HELLO WORLD 2"]
        

