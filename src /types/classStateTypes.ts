import { ClassDetailsItemType, ClassItemType } from "./genericTypes"

export type ClassStateTypes = {
    fetchingClass: boolean;
  classData: ClassItemType[];
  classDetail: ClassDetailsItemType[];
}

export type ClassStoreTypes = {
  classes: ClassStateTypes;
  classdetails: ClassStateTypes;
};

