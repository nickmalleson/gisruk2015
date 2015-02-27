# Parse the csv file with paper details and convert it to a json-formatted file called
# 'papers_db.json'

import json
import pandas as pd
import re

# Read the csv file using pandas handy csv reading function
data =  pd.read_csv("papers_db.csv")

out = [] # Store everything in a list of dictionaries and then dump to json

for i in range(len(data)):
    d = {}
    d['PaperNo'] = data['PaperNo'][i]
    d['title'] = data['title'][i]
    d['group'] = data['Group'][i]
    d['category'] = data['category'][i]
    # Split authors string on commas and 'and'
    authors = []
    for auth in re.split(r',|and', data['authors'][i].strip()):
        authors.append(auth.strip())
    d['authors'] = authors
    out.append(d)

# Now convert that lot to json and write out

with open('papers_db.json','w') as f:
    json.dump(out, f)
    print "Have written output to",f.name
