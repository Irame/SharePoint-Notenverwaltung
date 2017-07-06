<%-- Die folgenden vier Zeilen sind ASP.NET-Direktiven, die bei der Verwendung von SharePoint-Komponenten erforderlich sind. --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- Markup und Skript im folgenden Content-Element werden im <head> der Seite platziert. --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Fügen Sie Ihre CSS-Formatvorlagen der folgenden Datei hinzu. -->
    <link rel="Stylesheet" type="text/css" href="../Content/css/bootstrap.min.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Fügen Sie Ihr JavaScript der folgenden Datei hinzu. -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<%-- Das Markup im folgenden Content-Element wird im "TitleArea" der Seite platziert. --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Notenverwaltung <span id="full-name"></span>
</asp:Content>

<%-- Markup und Skript im folgenden Content-Element werden im <body> der Seite platziert. --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div>
        <p id="message">
            <!-- Der folgende Inhalt wird durch den Benutzernamen ersetzt, wenn Sie die App ausführen (siehe "App.js"). -->
            initializing...
        </p>
        <div class="firstrow row">
            <div id="empty-div"></div>
            <div class="col-sharepoint-offset col-sm-10 col-sm-offset-1">
                <div class="panel-group">
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title">
                        <a data-toggle="collapse" href="#collapse1">2016/2017 - 10B</a>
                      </h4>
                    </div>
                    <div id="collapse1" class="panel-collapse collapse">
                      <div class="panel-body">Panel Body</div>
                      <div class="panel-footer">Panel Footer</div>
                    </div>
                  </div>
                </div>

                <div class="panel-group">
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title">
                        <a data-toggle="collapse" href="#collapse2">2015/2016 - 9B</a>
                      </h4>
                    </div>
                    <div id="collapse2" class="panel-collapse collapse">
                      <div class="panel-body">Panel Body</div>
                      <div class="panel-footer">Panel Footer</div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>