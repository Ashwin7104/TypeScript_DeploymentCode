class DeploymentTool {
    private web: SP.Web;
    private clientContext: SP.ClientContext;


    constructor(clientContext: SP.ClientContext, web: SP.Web) {
        this.web = web;
        this.clientContext = clientContext;
    }

    public createContentTypes(contentTypesDefinitions: Array<ContentTypeModel>, done: any): void {
        try {
            for (var i = 0; i < contentTypesDefinitions.length; i++) {
                this.createContentType(contentTypesDefinitions[i], (contentType: SP.ContentType, error: string) => {
                    if (contentType != null)
                    { console.log("Content type with name: " + contentType.get_name() + " and ID: " + contentType.get_stringId() + " has been created"); }
                    if (error != null) {
                        console.log(error);
                    }
                });
            }
        } catch (ex) {
            done(ex);
        }
        done(null);
    }

    private getContentTypeByName(contentTypeCol, ctName) {
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
    }

    private createContentType(contentTypesDefinition: ContentTypeModel, done: any): void {
        var webContentTypes = this.web.get_contentTypes();
        var these = this;
        these.clientContext.load(webContentTypes);
        these.clientContext.executeQueryAsync(() => {
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
            these.clientContext.executeQueryAsync(() => {
                done(current, null);
            }, (sender, args) => {
                done(null, args.get_message());
            });
        }, () => {
            console.log(contentTypesDefinition.Name + " provision error");
        });
    }
}
