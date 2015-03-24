# Parse the csv file with paper details and convert it to a json-formatted file called
# 'papers_db.json'

import json
import pandas as pd
import re
import math

def check(s):
    """Checks that the input string, s, has some content. If not, return 'na'. Note that pandas sets
    some data to be 'nan', which is actually a number. Hence the need to check for floats"""
    if s == None or s == "" or type(s) == type(1.0): 
        return 'na'
    else:
        return s

# Read the csv file using pandas handy csv reading function
data =  pd.read_csv("papers_db.csv")

out = [] # Store everything in a list of dictionaries and then dump to json

for i in range(len(data)):
    d = {}
    d['PaperNo'] = data['PaperNo'][i]
    d['title'] = data['title'][i]
    d['group'] = check(data['Group'][i])
    d['category'] = check(data['category'][i])
    # Split authors string on commas and 'and'
    authors = []
    for auth in re.split(r',|and', data['authors'][i].strip()):
        authors.append(auth.strip().strip(','))
    d['authors'] = authors
    out.append(d)

# Now convert that lot to json and write out

with open('papers_db.json','w') as f:
    json.dump(out, f)
    print "Have written output to",f.name
