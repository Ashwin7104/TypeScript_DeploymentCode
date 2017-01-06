var _deploymentTool;
$(document).ready(function () {
    var scriptbase = _spPageContextInfo.layoutsUrl + "/";
    $.getScript(scriptbase + "SP.Runtime.js", function () {
        $.getScript(scriptbase + "SP.js", function () {
            var context = new SP.ClientContext(_spPageContextInfo.siteServerRelativeUrl);
            var web = context.get_web();
            context.load(web);
            context.executeQueryAsync(function () {
                _deploymentTool = new DeploymentTool(context, web);
                $("#provisionContentTypes").show();
            }, function () {
                console.log("SP.Web initialization failed");
            });
        });
    });
});
var UiFunctions;
(function (UiFunctions) {
    var ButtonClicks;
    (function (ButtonClicks) {
        function contentTypeProvision() {
            _deploymentTool.createContentTypes(Deployment.ContentTypes, function () {
                console.log("content type provisioning");
            });
        }
        ButtonClicks.contentTypeProvision = contentTypeProvision;
    })(ButtonClicks = UiFunctions.ButtonClicks || (UiFunctions.ButtonClicks = {}));
})(UiFunctions || (UiFunctions = {}));
//# sourceMappingURL=Main.js.map