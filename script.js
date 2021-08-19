function readForm(page){
    boxes = document.getElementsByClassName("checkbox");
    var sum = 0;
    var list = [];
    for(var i = 0; i < boxes.length; i++)
    {
        if(boxes[i].checked == true)
        {
            list.push(boxes[i].id);
        }
    }
    
    switch(page){
        case '1':
            sessionStorage.setItem("smartSpeakers", list);
            window.location.href = "q2.html";
            break;
        case '2':
            sessionStorage.setItem("securities", list);
            window.location.href = "q3.html";
            break;
        case '3':
            sessionStorage.setItem("tablets", list);
            window.location.href = "q4.html";
            break;
        case '4':
            sessionStorage.setItem("entertainments", list);
            window.location.href = "q5.html";
            break;
        case '5':
            sessionStorage.setItem("headphones", list);
            window.location.href = "q6.html";
            break;
        case '6':
            sessionStorage.setItem("watches", list);
            window.location.href = "result.html";
    }
}

function integrateData(myType)
{
    var Airtable = require('airtable');

    Airtable.configure({
        endpointUrl: 'https://api.airtable.com',
        apiKey: 'keyJcLddmhvNHFP9W'
    });
    var base = Airtable.base('appVrPFd9q8B4FTqd');

    base('Products List').select({
        // Selecting the first 100 records in All Products:
        maxRecords: 100,
        view: "All Products"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
            if(record.get('Type') == myType)
            {
                let brand = record.get('Brand');
                let model = record.get('Model');
                let id = record.get('Record ID');
                var answers = document.getElementById("answer");

                var label = document.createElement('label');
                label.setAttribute("class", "choice");
                answers.appendChild(label);

                var checkbox = document.createElement('input');
                checkbox.setAttribute("type", "checkbox");
                checkbox.setAttribute("class", "checkbox");
                checkbox.setAttribute("value", model);
                checkbox.setAttribute("id", id);

                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(brand + " " + model));

            }
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}
