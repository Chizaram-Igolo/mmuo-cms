export interface IModule {
  name: string;
  bgColor?: string;
  icon?: string;
  intro?: string;
  moduleId: string;
  moduleGroup?: string;
  moduleGroupId: string;
}

export interface IModules {
  moduleGroupId: string;
  moduleGroup: string;
  modules: IModule[];
}

export interface IModuleGroupValue {
  id: number;
  name: string;
  avatar: string;
}

export interface AudioFile {
  id: string;
  name: string;
  type: string;
  size: number;
  lastModified: number;
  lastModifiedDate: Date;
  webkitRelativePath: "";
}

export interface FilePost {
  files?: AudioFile[];
  totalBytes?: number;
}

export interface FileDownLoadUrls {
  id: string;
  url: string;
}
