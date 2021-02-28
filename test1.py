import json
import indeedTest as indeed
import monsterTest as monster


positionName = input()
location = input()
arr1 = indeed.main2(positionName, location)
arr2 = monster.main1(positionName, location)
for element in arr2:
    arr1.append(element)
    
print(json.dumps(arr1))