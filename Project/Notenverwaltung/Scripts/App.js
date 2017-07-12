'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage()
{
    var context = SP.ClientContext.get_current();
    var user = context.get_web().get_currentUser();

    // Dieser Code wird ausgeführt, wenn das DOM bereit ist. Es wird ein Kontextobjekt erstellt, das zur Verwendung des SharePoint-Objektmodells erforderlich ist.
    $(document).ready(function () {
        getUserName();
        
    });

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
