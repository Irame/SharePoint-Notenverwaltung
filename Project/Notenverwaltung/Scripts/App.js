'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage()
{
    var context = SP.ClientContext.get_current();
    var user = context.get_web().get_currentUser();

    // Dieser Code wird ausgeführt, wenn das DOM bereit ist. Es wird ein Kontextobjekt erstellt, das zur Verwendung des SharePoint-Objektmodells erforderlich ist.
    $(document).ready(function () {
        getUserName();
        
        $(".js-example-basic-single").select2();
        getBackendData();
    });

    function getBackendData() {
        $.getJSON("../Scripts/lehrer_data.js", function (data) {


            var items = [];
            //for (var g = 0;data['jahrgaenge'].length)

            $.each(data['jahrgaenge'], function (key, val) {
                var panelHeader = 'Jahrgang ' + key;
                var outerFirstPart = getCollapsePanelFirstPart(panelHeader, "firstrow");
                var outerLastPart = getCollapsePanelLastPart();
                
                var klassen = [];
                for (var h = 0; h < val.length; h++) {
                    var faecher = [];
                    var currentClass = val[h];
                    var fachPanelHeader = currentClass['klasse'];
                    var klasse = getCollapsePanelFirstPart(fachPanelHeader, "");

                    for (var i = 0; i < currentClass['faecher'].length; i++) {
                        var faecherHTML = [];
                        var fachPanelHeader = currentClass['faecher'][i]['name'];
                        var fach = getCollapsePanelFirstPart(fachPanelHeader, "");

                        var schuelerArr = currentClass['faecher'][i]['schueler'];
                        for (var k = 0; k < schuelerArr.length; k++) {
                            var schuelerPanelHeader = schuelerArr[k]['name'];
                            var schuelerPanel = getCollapsePanelFirstPartWithoutPanelBodyAndButton(schuelerPanelHeader, "");
                            schuelerPanel += '<table class="table">';
                            schuelerPanel += '<tr><th>Typ</th><th>Note</th><th>Datum</th></tr>';
                            for (var l = 0; l < schuelerArr[k]['noten'].length; l++) {
                                var currentNote = schuelerArr[k]['noten'][l];
                                var date = new Date(currentNote['datum']);
                                schuelerPanel += '<tr><td>' + currentNote['typ'] + '</td><td>' + currentNote['note'] + '</td><td>' + date.toLocaleDateString() + '</td></tr>';
                            }
                            schuelerPanel += '</table>';
                            schuelerPanel += getCollapsePanelLastPartWithoutPanelBody();
                            faecherHTML.push(schuelerPanel);
                        }
                        fach += faecherHTML.join("");
                        fach += getCollapsePanelLastPart();
                        faecher.push(fach);
                    }
                    klasse += faecher.join("");
                    klasse += getCollapsePanelLastPart();
                    klassen.push(klasse);
                }
                

                var panelBody = klassen.join("");
                var htmlToAdd = outerFirstPart + panelBody + outerLastPart;
                items.push(htmlToAdd);
            });
            $('#noten-content').append(items.join(""));
        });
    }

    function getCollapsePanelFirstPartWithoutPanelBodyAndButton(panelHeaderText, colClasses) {
        var key = makeId();
        return `<div class="` + colClasses + `">
                    <div class="panel-group">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <button type="button" class="panel-head-button pull-right btn btn-default btn-sm" data-toggle="modal" data-target="#myModal">
                              Note hinzufügen
                            </button>
                            <h4 class="panel-title">
                                <a data-toggle="collapse" href="#collapse` + key + `">` + panelHeaderText + `</a>
                            </h4>
                        </div>
                        <div id="collapse` + key + `" class="panel-collapse collapse">`;
    }
    function getCollapsePanelFirstPartWithoutPanelBody(panelHeaderText, colClasses) {
        var key = makeId();
        return `<div class="` + colClasses + `">
                    <div class="panel-group">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" href="#collapse` + key + `">` + panelHeaderText + `</a>
                            </h4>
                        </div>
                        <div id="collapse` + key + `" class="panel-collapse collapse">`;
    }
    function getCollapsePanelFirstPart(panelHeaderText, colClasses) {
        return getCollapsePanelFirstPartWithoutPanelBody(panelHeaderText, colClasses) + '<div class="panel-body">';
    }

    function getCollapsePanelLastPartWithoutPanelBody() {
        return `        </div>
                      </div>
                    </div></div>`;
    }
    function getCollapsePanelLastPart() {
        return getCollapsePanelLastPartWithoutPanelBody() + '</div>';
    }

    function makeId() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    // Mit dieser Funktion wird eine SharePoint-Abfrage vorbereitet, geladen und dann ausgeführt, um die aktuellen Benutzerinformationen abzurufen.
    function getUserName() {
        context.load(user);
        context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
    }

    // Diese Funktion wird ausgeführt, wenn der obige Aufruf erfolgreich ist.
    // Hierbei werden die Inhalte des message-Elements durch den Benutzernamen ersetzt.
    function onGetUserNameSuccess() {
        $('#message').text('Hello ' + user.get_title());
    }

    // Diese Funktion wird bei einem Fehler des obigen Aufrufs ausgeführt.
    function onGetUserNameFail(sender, args) {
        alert('Failed to get user name. Error:' + args.get_message());
    }
}
