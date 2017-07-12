'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage() {
    var context = SP.ClientContext.get_current();
    var user = context.get_web().get_currentUser();

    // Dieser Code wird ausgeführt, wenn das DOM bereit ist. Es wird ein Kontextobjekt erstellt, das zur Verwendung des SharePoint-Objektmodells erforderlich ist.
    $(document).ready(function () {
        getUserName();

        getBackendData();
    });

    function getBackendData() {
        $.getJSON("../Scripts/schueler.js", function (data) {

            //var jsonObj = JSON.parse(data);
            $("#full-name").html(data['name']);

            var items = [];
            $.each(data['jahrgaenge'], function (key, val) {
                var panelHeader = val['jahrgang'] + ' - ' + val['klasse'] + ' - &#216; ' + val['notendurchschnitt'];
                var outerFirstPart = getCollapsePanelFirstPart(panelHeader, "col-sharepoint-offset col-sm-10 col-sm-offset-1");
                var outerLastPart = getCollapsePanelLastPart();
                var panelBody = '<dl class="dl-horizontal"><dt>Jahrgang</dt><dd>' + val['jahrgang']; + '</dd>';
                panelBody += '<dt>Klasse</dt><dd>' + val['klasse'] + '</dd>';
                panelBody += '<dt>Notendurchschnitt</dt><dd>' + val['notendurchschnitt'] + '</dd>';
                panelBody += '<dt>Jahreszeugnis</dt><dd></dd>';
                panelBody += '<dt>Halbjahreszeugnis</dt><dd></dd>';
                panelBody += '</dl>';

                var faecher = [];
                for (var i = 0; i < val['faecher'].length; i++) {
                    var fachPanelHeader = val['faecher'][i]['name'] + ' - &#216; ' + val['faecher'][i]['notendurchschnitt'];
                    var fach = getCollapsePanelFirstPartWithoutPanelBody(fachPanelHeader, "");

                    fach += '<table class="table">';
                    fach += '<th>Datum</th><th>Note</th><th>Typ</th>';
                    for (var j = 0; j < val['faecher'][i]['noten'].length; j++) {
                        fach += '<tr><td>' + val['faecher'][i]['noten'][j].datum + '</td><td>' + val['faecher'][i]['noten'][j].note + '</td><td>' + val['faecher'][i]['noten'][j].typ + '</td><td></tr>';
                    }
                    fach += '</table>';
                    fach += getCollapsePanelLastPartWithoutPanelBody();
                    faecher.push(fach);
                }

                panelBody += faecher.join("");
                var htmlToAdd = outerFirstPart + panelBody + outerLastPart;
                items.push(htmlToAdd);
            });


            $('#noten-content').append(items.join(""));
        });
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
                    </div>`;
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