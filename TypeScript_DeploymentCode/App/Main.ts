var _deploymentTool;
$(document).ready(() => {
    var scriptbase = _spPageContextInfo.layoutsUrl + "/";
    $.getScript(scriptbase + "SP.Runtime.js", () => {
        $.getScript(scriptbase + "SP.js", () => {
            var context = new SP.ClientContext(_spPageContextInfo.siteServerRelativeUrl);
            var web = context.get_web();
            context.load(web);
            context.executeQueryAsync(() => {
                _deploymentTool = new DeploymentTool(context, web);
                $("#provisionContentTypes").show();
            }, () => {
                console.log("SP.Web initialization failed");
            });
        });
    });
});


module UiFunctions {
    export module ButtonClicks {
        export function contentTypeProvision() {

            _deploymentTool.createContentTypes(Deployment.ContentTypes, () => {
                console.log("content type provisioning");
            });
        }
    }
}
