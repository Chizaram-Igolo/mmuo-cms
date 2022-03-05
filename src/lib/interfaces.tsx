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
