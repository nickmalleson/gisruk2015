---
layout: master
---

<hr/>
 - Download the **[full conference handbook (.pdf)](./programme_files/GISRUK_handbook.pdf).**
 - Download **[all paper abstracts (.zip)](XX)** 
 <hr/>
 
GISRUK Conference Programme
---------------

This page contains the draft conference programme. To find out when your paper has been scheduled simply locate your paper on the searchable list of [papers and their timetabled sessions](#sesions).

You can also find:

 - An [overview](#programme) of the programme.
 
 - A [workshop programme](#workshop), containing an overview of all the workshops.
 
 - A <a href="./session_overview.html">session overview</a> that lists all papers and abstracts by their session.

Preparing your Presentation or Poster
---------------

If you are presenting a paper, please prepare a presentation that is **no longer than 15 minutes**. This
will allow a few minutes for questions. If you have electronic slides, these can be uploaded on the
day. The presentation computers will have internet access (barring any unexpected failures).

If you are preparing a poster, it will need to fit on a poster board that is A0 size portrait. So
your poster can either be A0 portrait size, or A1 landscape (or smaller of course).


<a name="sessions">Papers and their Timetabled Sessions</a>
---------------

This is a searchable table. Put text into the boxes below and only papers that match your search criteria will be shown. Clear the text boxes to show all papers.

To find out when your session has been timetabled, see the main [conference programme](#programme).

<!--
NOTE: the searchable programme below comes from the 'programme' branch of this project. See that branch for details about how it works, where the data come from, and how it was created
ALSO NOTE: after copying in the <script> stuff, the indentation needs to be reduced otherwise jekyll thinks that it should interpret the html as text (source code), rather than proper html. Possibly best thing to do is remove all indentation all together (the readable code is still available to see in the 'programme' branch).
 -->


<form>
<div class="formbox">Author name: <input type="text" name="name" id="name-form"></div>
<div class="formbox">Paper Title: <input type="text" name="title" id="title-form"></div>
<div class="formbox">Abstract: <input type="text" name="abstract" id="abstract-form"></div>
</form>
        
<table>
<thead>
<tr>
<th>#</th>
<th>Authors</th>
<th>Title</th>
<th>Session</th>
<!--<th>Group</th>
<th>Category</th>-->
<th>Abstract</th>
</tr>
</thead>
<tbody></tbody>
</table>


<script type="text/javascript">
var dataset; // Global variable to represent the data           

// Variables used to filter the data. These are bound to the input elements
var filter_name = "";
var filter_title = "";
var filter_abstract = "";


// Read the data. This is asynchronous, so all data handling should be done in the
// callback function
d3.json("./programme_files/all_papers.json", function(error, data) {
if (error) {  //If error is not null, something went wrong.
console.log(error);  //Log the error.
} 

else {      //If no error, the file loaded correctly. 
dataset = data; // Once loaded, keep a reference to the data

// *** Now call functions that reqiure the data ***

// This one makes the table for the first time
populateTable(init=true);


// This one binds inputs into the entry form to functions
// that change the data displayed in the table
bindForm();

} // else
//console.log(dataset);
//console.log(d3.selectAll("div"))
} // function
); // d3.csv

/** Add relevant papers to the table. The 'init' parameter specifies whether
this is the first time the table has been generated*/
function populateTable(init) {

// Not really sure how this works. Need to join rows, then columns.
// See: https://github.com/mbostock/d3/wiki/Selections#data
// and maybe: http://bost.ocks.org/mike/join/

if (init) {

// Bind the rows to each line of data / json object (e.g. a paper)
var tr = d3.select("tbody").selectAll("tr").data(dataset).enter().append("tr");

// Add some fancy visualisation stuff to the rows
tr.on("mouseover", function(d) {
//This will run whenever *any* bar is clicked
//console.log(d);
});

// Now add data to each of the rows
var td = tr.selectAll("td")
// Bind the data json object (a paper) to the number of <td> elements required
.data(function(d, i){
console.log("populatePaper:"+filter_name);
return [d,d,d,d,d];
}) 
// Create new <td> elements for each datum
.enter().append("td")
// Populate the <td> with author, title, etc
.html(function(d, i){return paperInfo(d,i,"details");})
// Attrbute can be use to set the style for <td>s
.attr("style", function(d, i){return paperInfo(d,i,"style");})
;
//.text(function(d, i){return "AA";});

} // if init

else { // Not initialising the table, just chosing which rows to display

if (filter_name === "" && filter_title === "" && filter_abstract === "") { // 
// No filter criteria, display all the rows
// (Note: transition doesn't work because d3 only interpolates on numerical values)
var tr = d3.select("table").selectAll("tr").transition().duration(1000).attr("style", "");
}

else { // There are some filter criteria, only display those rows that match criteria
// Get the rows and make them invisible
var tr = d3.select("table").selectAll("tr")
.attr("style", function(d,i) {
if (i===0) {
// Always show the first row (the header). Returning empty string
// means that the style attrbute for each row is null (i.e. not display:none)
return ""; 
}

var anyMatch = false; // See if there is any match from the three filter criteria
// Set the display style depending on values in this row (e.g. display:none to hide, empty string to show )
// If any criteria match, then display the row, otherwise don't
if (filter_name != "") {
// Authors is an array of authors, so search on all authors separately
for (var num = 0;  num < d['authors'].length; num++) {
if (d['authors'][num].toLowerCase().indexOf(filter_name) > -1) {
anyMatch = true;
break; // Don't loop through any other authors
}
}
}
if (filter_title != "") {
if (d['title'].toLowerCase().indexOf(filter_title) > -1) {
anyMatch = true;
}
}
if (filter_abstract != "") {
if (d['abstract'].toLowerCase().indexOf(filter_abstract) > -1) {
anyMatch = true;
}
}
// Now decide whether to display the row
if (anyMatch) { // Any of the criteria match
return ""; // Set the display style to null (show);
}
else { // None match
return "display:none";
}
} );

}

}// else init

} // List papers ()


/** Return a row of html for the datum 'd'.
Type can have the following:
- 'details' - return the actual text for each <td>
- 'style' - return the style attribute for the <td> (used to reduce abstract text size)
*/
function paperInfo(d, i, type){
switch (i) {
case 0: 
if (type==="details") return d['number'];
else if (type==="style") return null; // Return null so no font-size attribute
case 1: 
if (type==="details") return d['authors']; 
else if (type==="style") return null;
case 2: 
if (type==="details") {
// Paper title should link to the full pdf
var url = "http://leeds.gisruk.org/abstracts/GISRUK2015_submission_"+d['number']+".pdf";
return "<a href=\""+url+"\">"+d['title']+"<\a>"; 
//return d['title']; 
}
else if (type==="style") {
return null;
}
case 3: 
if (type==="details")  {
// Session should link to the relevant part of the session overview page
// note: 'session' json element contains and array with information about the session:
// session title, chair, session number, location
//return d['session'][0].substring(0,2); // Don't use session names yet
var url = "http://leeds.gisruk.org/session_overview.html#"+d['session'][2];
return "<a href=\""+url+"\">"+d['session'][0]+"<\a>"; 
}
else if (type==="style") {
return null;
}
/*case 4: return d['groups'];
case 5: return d['category'];*/
case 4: 
if (type==="details") return d['abstract'];
else if (type==="style") return "font-size: 0.7em;"; // Make abstract smaller
//default: return "no abstract yet";                        
}// switch

}

/* Bind the user input form to functions that are executed each time there 
is a chang in out of the text boxes
*/
function bindForm() {

// (all values are made lower case so that filtering can be case insensitive)

// bind the author name
d3.select("#name-form").on("input", function() {
filter_name = this.value.toLowerCase();
populateTable(false);
//console.log(this.value+"-"+filter_name);
});

// bind the paper title
d3.select("#title-form").on("input", function() {
filter_title = this.value.toLowerCase();
populateTable(false);
//console.log(this.value);
});

// bind the abstract
d3.select("#abstract-form").on("input", function() {
filter_abstract = this.value.toLowerCase();
populateTable(false);
//console.log(this.value);
});

}


</script>
















<a name="programme">Conference Programme</a>
---------------

<!---
The preliminary programme is as follows:

<iframe src="programme-draft.html" width="95%" height="600px"></iframe> 
-->




<img src="./figures/conference_programme.png" style="
    height: auto;
    border: none;
    border-radius:0px;
    padding:10px 10px 10px 10px;
    border:1px solid #BFBFBF;
    background-color:white;
    box-shadow:2px 2px 3px #aaaaaa;
    border-radius:15px;"
/>


<a name="workshop">Workshop Timetable</a>
---------------

<img src="./figures/workshop_programme.png"  style="
	width:95%;
    height: auto;
    border: none;
    border-radius:0px;
    padding:10px 10px 10px 10px;
    border:1px solid #BFBFBF;
    background-color:white;
    box-shadow:2px 2px 3px #aaaaaa;
    border-radius:15px;"
/>
