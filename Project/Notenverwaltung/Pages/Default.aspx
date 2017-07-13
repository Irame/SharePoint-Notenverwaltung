<%-- Die folgenden vier Zeilen sind ASP.NET-Direktiven, die bei der Verwendung von SharePoint-Komponenten erforderlich sind. --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- Markup und Skript im folgenden Content-Element werden im <head> der Seite platziert. --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/select2.full.min.js"></script>
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Fügen Sie Ihre CSS-Formatvorlagen der folgenden Datei hinzu. -->
    <link rel="Stylesheet" type="text/css" href="../Content/css/bootstrap.min.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/css/select2.min.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Fügen Sie Ihr JavaScript der folgenden Datei hinzu. -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<%-- Das Markup im folgenden Content-Element wird im "TitleArea" der Seite platziert. --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Notenverwaltung
</asp:Content>

<%-- Markup und Skript im folgenden Content-Element werden im <body> der Seite platziert. --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div>
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span class="pull-right" aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Notenvergabe</h4>
                    </div>
                    <div class="modal-body row">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label for="input-schueler" class="label-margin-top-5 col-sm-2 control-label">Schüler</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="input-schueler" placeholder="Max Mustermann" value="Klara Klinger" disabled>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="input-fach" class="label-margin-top-5 col-sm-2 control-label">Schulfach</label>
                                <div class="col-sm-10">
                                    <select class="form-control" id="input-fach">
                                        <option value="Mathe">Mathematik</option>
                                        <option value="Deutsch">Deutsch</option>
                                        <option value="Geschichte">Geschichte</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="input-note" class="label-margin-top-5 col-sm-2 control-label">Note</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="input-note" placeholder="Note">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="input-typ" class="label-margin-top-5 col-sm-2 control-label">Typ</label>
                                <div class="col-sm-10">
                                    <select class="form-control" id="input-typ">
                                        <option value="Schulaufgabe">Schulaufgabe</option>
                                        <option value="Stehgreifaufgabe">Stehgreifaufgabe</option>
                                        <option value="Abfrage">Abfrage</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Abbrechen</button>
                        <button type="button" class="btn btn-primary" id="note-anlegen">Bestätigen</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="margin-top-50 row col-sharepoint-offset col-sm-10 col-sm-offset-1">
            <div class="form-group">
                <label for="suche" class="label-margin-top-5 col-sm-1 control-label">Suche</label>
                <select class="js-example-basic-single form-control" id="suche" style="width: 195px">
                <optgroup label="Klasse 10B">
                    <option value="AL">Beatrice Bauer</option>
                    <option value="AL">Denis Diller</option>
                    <option value="WY">Frederic Fenchl</option>
                    <option value="WY">Klara Klinger</option>
                </optgroup>
                <optgroup label="Klasse 11A">
                    <option value="AB">Eva Eller</option>
                    <option value="AB">Iana Iller</option>
                    <option value="AB">Olaf Oger</option>
                </optgroup>
            </select>
            </div>

            

            <div id="noten-content">
            </div>
        </div>
    </div>

</asp:Content>
