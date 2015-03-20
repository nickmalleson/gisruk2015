Create the conference programme
-------------------

1 - csv2json.py
===================

Converts a csv file into a json file for use in the next step. **Note that this is no longer necessary as a json file can be produced directly from the abstracts data.**

papers_db.csv -> papaers_db.json


2 - programme_db.html
===================

Uses D3 to read the conference data (in the file all_papers.json) and display it, providing functions for filtering etc.

all_papers.json comes from a dump of all easychair data (see research/conferences/GISRUK2015/programme/easychair_scrape/scrape_gisruk_html.py)


