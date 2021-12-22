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
        myList = document.getElementsByClassName("selections")[0];
        myArr.sort();
        promises = [];
        for(let i = 0; i < myArr.length; i++)
        {
            if(myArr[i] != '')
            {
                var entry = fillEntry(myList, myArr[i]);
                console.log(entry)
                promises.push(entry)
                //store an array of all promises here
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
        node.setAttribute("class", "list-inline-item text-center lead col-sm-3 m-2");
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
function createCard(list)
{
    div = document.createElement("div");
    div.setAttribute("class", "col-sm-4");
    card = document.createElement("div");
    card.setAttribute("class", "card bg-dark border-white col-sm-12 ml-4 my-3 p-3");
    card.setAttribute("style", "width: 18rem;")
    list.appendChild(div);
    div.appendChild(card);
    cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body text-center");
    card.appendChild(cardBody);
    return cardBody;
}
function getStats()
{
    statsList = document.getElementsByClassName("stats")[0];
    if(cameraCount > 0)
    {
        var cardBody = createCard(statsList)
        header = document.createElement('h1');
        header.setAttribute("class", "card-title");
        par = document.createElement('p');
        par.setAttribute("class", "card-text");
        if(cameraCount == 1)
        {
            header.appendChild(document.createTextNode("1"));
            par.appendChild(document.createTextNode("device has cameras installed."))
        }
        else
        {
            header.appendChild(document.createTextNode(cameraCount));
            par.appendChild(document.createTextNode("devices have cameras installed."))
        }
        cardBody.appendChild(header);
        cardBody.appendChild(par);
    }
    if(micCount > 0)
    {
        var cardBody = createCard(statsList)
        header = document.createElement('h1');
        header.setAttribute("class", "card-title");
        par = document.createElement('p');
        par.setAttribute("class", "card-text");
        if(micCount == 1)
        {
            header.appendChild(document.createTextNode("1"));
            par.appendChild(document.createTextNode("device has microphones installed."))
        }
        else
        {
            header.appendChild(document.createTextNode(micCount));
            par.appendChild(document.createTextNode("devices have microphones installed."))
        }
        cardBody.appendChild(header);
        cardBody.appendChild(par);
    }
    if(trackerCount > 0)
    {
        var cardBody = createCard(statsList)
        header = document.createElement('h1');
        header.setAttribute("class", "card-title");
        par = document.createElement('p');
        par.setAttribute("class", "card-text");
        if(trackerCount == 1)
        {
            header.appendChild(document.createTextNode("1"));
            par.appendChild(document.createTextNode("device can track your location."))
        }
        else
        {
            header.appendChild(document.createTextNode(trackerCount));
            par.appendChild(document.createTextNode("devices can track your location."))
        }
        cardBody.appendChild(header);
        cardBody.appendChild(par);
    }
    if(phoneNums > 0)
    {
        var cardBody = createCard(statsList)
        header = document.createElement('h1');
        header.setAttribute("class", "card-title");
        par = document.createElement('p');
        par.setAttribute("class", "card-text");
        if(phoneNums == 1)
        {
            header.appendChild(document.createTextNode("1"));
            par.appendChild(document.createTextNode("device requires a phone number for setup."))
        }
        else
        {
            header.appendChild(document.createTextNode(phoneNums));
            par.appendChild(document.createTextNode("devices require a phone number for setup."))
        }
        cardBody.appendChild(header);
        cardBody.appendChild(par);
    }
    if(pDataCollectors > 0)
    {
        var cardBody = createCard(statsList)
        header = document.createElement('h1');
        header.setAttribute("class", "card-title");
        par = document.createElement('p');
        par.setAttribute("class", "card-text");
        if(pDataCollectors == 1)
        {
            header.appendChild(document.createTextNode("1"));
            par.appendChild(document.createTextNode("device requires personal information, such as email, addresses, DOB, etc."));
        }
        else
        {
            header.appendChild(document.createTextNode(pDataCollectors));
            par.appendChild(document.createTextNode("devices require personal information, such as email, addresses, DOB, etc."));
        }
        cardBody.appendChild(header);
        cardBody.appendChild(par);
    }
    if(aiCount > 0)
    {
        var cardBody = createCard(statsList)
        header = document.createElement('h1');
        header.setAttribute("class", "card-title");
        par = document.createElement('p');
        par.setAttribute("class", "card-text");
        if(aiCount == 1)
        {
            header.appendChild(document.createTextNode("1"));
            par.appendChild(document.createTextNode("device uses AI. It can be taken advantage of to make judgements about the user."));
        }
        else
        {
            header.appendChild(document.createTextNode(aiCount));
            par.appendChild(document.createTextNode("devices use AI. It can be taken advantage of to make judgements about the user."));
        }
        cardBody.appendChild(header);
        cardBody.appendChild(par);
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
    myList = document.getElementsByClassName("problems")[0];
    base('Products List').find(id, function(err, record) {
        if (err) { console.error(err); return; }
        //console.log('Retrieved', record.id);
        if('' + record.get('Biometrics Collected?') == 'true')
        {
            var node = document.createElement('li');
            node.setAttribute("class", "list-group-item text-center text-dark");
            node.appendChild(document.createTextNode('The ' + record.get('Brand') + ' ' + record.get('Model')
                + ' collects your biometric data.'))
            myList.appendChild(node);
        }
        if('' + record.get('Social Collected?') == 'true')
        {
            var node = document.createElement('li');
            node.setAttribute("class", "list-group-item text-center text-dark");
            node.appendChild(document.createTextNode('The ' + record.get('Brand') + ' ' + record.get('Model')
                + ' collects your social data.'))
            myList.appendChild(node);
        }

        if('' + record.get('Opt Out/Opt In') != 'true')
        {
            var node = document.createElement('li');
            node.setAttribute("class", "list-group-item text-center text-dark");
            node.appendChild(document.createTextNode('The ' + record.get('Brand') + ' ' + record.get('Model')
                + ' does NOT allow you to opt-out of data collection services.'))
            myList.appendChild(node);
        }

        if('' + record.get('Minimum Standards?') != 'true')
        {
            var node = document.createElement('li');
            node.setAttribute("class", "list-group-item text-center bg-danger");
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
            node.setAttribute("class", "list-group-item text-center bg-danger");
            node.appendChild(document.createTextNode('The ' + record.get('Brand') + ' ' + record.get('Model')
                + " has been labelled as 'Privacy Not Included' by Mozilla, indicating serious privacy issues." +
                " For more information, visit "));
            aElem = document.createElement('a');
            aElem.setAttribute("href", record.get('Link'));
            aElem.appendChild(document.createTextNode(" Mozilla's site"));
            node.appendChild(aElem);
            myList.appendChild(node);
            
        }
    });
}