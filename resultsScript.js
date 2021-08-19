let cameraCount = 0;
let micCount = 0;
let trackerCount = 0;
let phoneNums = 0;
let pDataCollectors = 0;
let aiCount = 0;
let myArr = [];
var Airtable = require('airtable');
/*https://support.airtable.com/hc/en-us/articles/360056249614-Creating-a-read-only-API-key*/
var base = new Airtable({apiKey: 'keyJcLddmhvNHFP9W'}).base('appVrPFd9q8B4FTqd');

//Ways to move forward: mustache, handlebars for templating

function reset()
{
    sessionStorage.clear();
    window.location.href = "index.html";
}

function getResults()
{
    try 
    {
        let fillArr = [];
        const s = ['smartSpeakers', 'securities', 'tablets', 'entertainments', 'headphones', 'watches'];
        s.forEach(fill);

        function fill(category)
        {
            fillArr = sessionStorage.getItem(category).split(",");
            fillArr.forEach(item => myArr.push(item));
        }
        myList = document.getElementById("selections");
        myArr.sort();
        promises = [];
        for(let i = 0; i < myArr.length; i++)
        {
            if(myArr[i] != '')
            {
                var entry = fillEntry(myList, myArr[i]);
                console.log(entry)
                promises.push(entry)
                //store an array fo all promises here
            }
        }
        Promise.all(promises).then(getStats)


    }
      catch (err) {
        // statements to handle any exceptions
        document.body.append(document.createTextNode(err));
        // pass exception object to error handler
      }
    
}

function fillEntry(myList, id)
{
    return base('Products List').find(id).then(function(record) {
        //console.log('Retrieved', record.id);
        var node = document.createElement('li');
        node.appendChild(document.createTextNode(record.get('Brand') + ' ' + record.get('Model')));
        if('' + record.get('Track Record') == 'Needs Improvement' || '' + record.get('Track Record') =='Bad')
        {
            node.appendChild(document.createTextNode('*'))
        }
        if('' + record.get('Camera?') == 'true')
        {
            cameraCount++;
        }
        if('' + record.get('Microphone?') == 'true')
        {
            micCount++;
        }
        if('' + record.get('Tracks Location?') == 'true')
        {
            trackerCount++;
        }
        if('' + record.get('Phone Required?') == 'true')
        {
            phoneNums++;
        }
        if('' + record.get('Personal Data Collected?') == 'true')
        {
            pDataCollectors++;
        }
        if('' + record.get('AI?') == 'true')
        {
            aiCount++;
        }
        myList.appendChild(node);
    });
}

function getStats()
{
    statsList = document.getElementById("stats");
    var node = document.createElement('li');
    if(cameraCount > 0)
    {
        if(cameraCount == 1)
        {
            node.appendChild(document.createTextNode("One device has cameras installed."));
        }
        else
        {
            node.appendChild(document.createTextNode(cameraCount + " devices have cameras installed."));
        }
        statsList.appendChild(node);
    }
    node = document.createElement('li');
    if(micCount > 0)
    {
        if(micCount == 1)
        {
            node.appendChild(document.createTextNode("One device has microphones installed."));
        }
        else
        {
            node.appendChild(document.createTextNode(micCount + " devices have microphones installed."));
        }
        statsList.appendChild(node);
    }
    node = document.createElement('li');
    if(trackerCount > 0)
    {
        if(trackerCount == 1)
        {
            node.appendChild(document.createTextNode("One device can track your location."));
        }
        else
        {
            node.appendChild(document.createTextNode(trackerCount + " devices can track your location."));
        }
        statsList.appendChild(node);
    }
    node = document.createElement('li');
    if(phoneNums > 0)
    {
        if(phoneNums == 1)
        {
            node.appendChild(document.createTextNode("One device requires a phone number for setup."));
        }
        else
        {
            node.appendChild(document.createTextNode(phoneNums + " devices require a phone number for setup."));
        }
        statsList.appendChild(node);
    }
    node = document.createElement('li');
    if(pDataCollectors > 0)
    {
        if(pDataCollectors == 1)
        {
            node.appendChild(document.createTextNode("One device requires personal information for setup, such as email info, addresses, DOB, etc."));
        }
        else
        {
            node.appendChild(document.createTextNode(pDataCollectors + " devices require personal information for setup, such as email info, addresses, DOB, etc."));
        }
        statsList.appendChild(node);
    }
    node = document.createElement('li');
    if(aiCount > 0)
    {
        if(aiCount == 1)
        {
            node.appendChild(document.createTextNode("One device uses AI. It can be taken advantage of to make judgements about the user."));
        }
        else
        {
            node.appendChild(document.createTextNode(aiCount + " devices use AI. It can be taken advantage of to make judgements about the user."));
        }
        statsList.appendChild(node);
    }
    getProblems();
}

function getProblems()
{
    for(let i = 0; i < myArr.length; i++)
    {

        if(myArr[i] != '')
        {
            console.log(myArr[i]);
            var entry = getProblemByID(myArr[i]);
        }
    }
}

function getProblemByID(id)
{
    myList = document.getElementById("problems");
    base('Products List').find(id, function(err, record) {
        if (err) { console.error(err); return; }
        //console.log('Retrieved', record.id);
        if('' + record.get('Biometrics Collected?') == 'true')
        {
            var node = document.createElement('li');
            node.appendChild(document.createTextNode('The ' + record.get('Brand') + ' ' + record.get('Model')
                + ' collects your biometric data.'))
            myList.appendChild(node);
        }
        if('' + record.get('Social Collected?') == 'true')
        {
            var node = document.createElement('li');
            node.appendChild(document.createTextNode('The ' + record.get('Brand') + ' ' + record.get('Model')
                + ' collects your social data.'))
            myList.appendChild(node);
        }

        if('' + record.get('Opt Out/Opt In') != 'true')
        {
            var node = document.createElement('li');
            node.appendChild(document.createTextNode('The ' + record.get('Brand') + ' ' + record.get('Model')
                + ' does NOT allow you to opt-out of data collection services.'))
            myList.appendChild(node);
        }

        if('' + record.get('Minimum Standards?') != 'true')
        {
            var node = document.createElement('li');
            node.appendChild(document.createTextNode('The ' + record.get('Brand') + ' ' + record.get('Model')
                + " does NOT meet minimum security standards. See Mozilla's guidelines "))
            aElem = document.createElement('a');
            aElem.setAttribute("href", "https://foundation.mozilla.org/en/privacynotincluded/about/meets-minimum-security-standards/");
            aElem.appendChild(document.createTextNode('here'));
            node.appendChild(aElem);
            myList.appendChild(node);
            
        }

        if('' + record.get('Privacy Not Included') == 'true')
        {
            var node = document.createElement('li');
            node.appendChild(document.createTextNode('The ' + record.get('Brand') + ' ' + record.get('Model')
                + " has been labelled as 'Privacy Not Included' by Mozilla, indicating serious privacy issues." +
                " For more information, visit the "));
            aElem = document.createElement('a');
            aElem.setAttribute("href", record.get('Link'));
            aElem.appendChild(document.createTextNode(" Mozilla's site"));
            node.appendChild(aElem);
            myList.appendChild(node);
            
        }
    });
}