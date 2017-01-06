
 class ContentTypeModel {
        constructor(options) {
            this.Name = options.Name;
            this.Group = options.Group;
            this.Description = options.Description;
            this.Inherits = options.Inherits;
            this.Version = options.Version;
            this.ParentName = options.ParentName;
        }

        public Name: string;
        public Group: string;
        public Description: string;
        public Inherits: string;
        public Version: string;
        public ParentName: string;
    }