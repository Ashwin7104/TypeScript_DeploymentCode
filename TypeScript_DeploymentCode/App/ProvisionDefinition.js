var Deployment;
(function (Deployment) {
    Deployment.ContentTypes = [
        new ContentTypeModel({
            Name: "Newsletter",
            Group: "Blog Content Types",
            Description: "Newsletters",
            Inherits: "TRUE",
            Version: "0",
            ParentName: "Item"
        }),
        new ContentTypeModel({
            Name: "Newsletter Content",
            Group: "Blog Content Types",
            Description: "Newsletters Content",
            Inherits: "TRUE",
            Version: "0",
            ParentName: "Item"
        })
    ];
})(Deployment || (Deployment = {}));
//# sourceMappingURL=ProvisionDefinition.js.map