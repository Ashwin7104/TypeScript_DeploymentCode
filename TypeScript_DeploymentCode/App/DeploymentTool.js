var DeploymentTool = (function () {
    function DeploymentTool(clientContext, web) {
        this.web = web;
        this.clientContext = clientContext;
    }
    DeploymentTool.prototype.createContentTypes = function (contentTypesDefinitions, done) {
        try {
            for (var i = 0; i < contentTypesDefinitions.length; i++) {
                this.createContentType(contentTypesDefinitions[i], function (contentType, error) {
                    if (contentType != null) {
                        console.log("Content type with name: " + contentType.get_name() + " and ID: " + contentType.get_stringId() + " has been created");
                    }
                    if (error != null) {
                        console.log(error);
                    }
                });
            }
        }
        catch (ex) {
            done(ex);
        }
        done(null);
    };
    DeploymentTool.prototype.getContentTypeByName = function (contentTypeCol, ctName) {
        var myCt = null;
        var contentTypeEnumerator = contentTypeCol.getEnumerator();
        while (contentTypeEnumerator.moveNext()) {
            var content = contentTypeEnumerator.get_current();
            if (content.get_name() === ctName) {
                myCt = content;
                break;
            }
        }
        return myCt;
    };
    DeploymentTool.prototype.createContentType = function (contentTypesDefinition, done) {
        var webContentTypes = this.web.get_contentTypes();
        var these = this;
        these.clientContext.load(webContentTypes);
        these.clientContext.executeQueryAsync(function () {
            var current = these.getContentTypeByName(webContentTypes, contentTypesDefinition.Name);
            if (current != null) {
                done(current);
                return;
            }
            var newContentType = new SP.ContentTypeCreationInformation();
            newContentType.set_name(contentTypesDefinition.Name);
            newContentType.set_description(contentTypesDefinition.Description);
            newContentType.set_group(contentTypesDefinition.Group);
            var parent = these.getContentTypeByName(webContentTypes, contentTypesDefinition.ParentName);
            newContentType.set_parentContentType(parent);
            current = webContentTypes.add(newContentType);
            these.clientContext.load(current);
            these.clientContext.load(webContentTypes);
            these.clientContext.executeQueryAsync(function () {
                done(current, null);
            }, function (sender, args) {
                done(null, args.get_message());
            });
        }, function () {
            console.log(contentTypesDefinition.Name + " provision error");
        });
    };
    return DeploymentTool;
}());
//# sourceMappingURL=DeploymentTool.js.map