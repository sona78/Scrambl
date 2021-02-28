import requests
import pandas as pd
from bs4 import BeautifulSoup
import json



templateString = 'https://www.indeed.com/jobs?q={}&l={}'
def makeString(title, loc):
    return templateString.format(title, loc)



def getSalary(object1):
    salary = object1.find('span', 'salaryText')
    if not salary:
        return ""
    else:
        return object1.find('span', 'salaryText').text.strip()

def getSummary(object1):
    summary = object1.find('div', 'summary')
    summary = summary.text.strip()
    return summary.replace("\n", " ")

def buildDict(titleOfPosition, organization, location, link, salary, summ):
    newDict = {
        "title" : titleOfPosition,
        "company" : organization,
        "location" : location,
        "salary" : salary,
        "link" : link,
        "summary" : summ,
        "source" : 'Indeed'
        }
    return newDict

def getInfoFromObject(object1):
    titleOfPosition = object1.h2.a.get('title')
    organization = object1.find('span', 'company').text.strip()
    location = object1.find('div', 'recJobLoc').get('data-rc-loc')
    link = 'https://www.indeed.com' + object1.h2.a.get('href')
    salary = getSalary(object1)
    summ = getSummary(object1)
    return(buildDict(titleOfPosition, organization, location, link, salary, summ))


def main2(position, location):
    newArr = []
    request1 = requests.get(makeString(position, location))
    if request1.ok:
        soup = BeautifulSoup(request1.text, 'html.parser')
        objects = soup.find_all('div', 'jobsearch-SerpJobCard')

        for object1 in objects:
            newArr.append(getInfoFromObject(object1))
        return newArr
    else:
        return ['HELLO WORLD']
    

    

    