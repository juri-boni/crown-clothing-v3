import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { createAction } from "../../utils/reducers/reducers.utils";

export const setCategoriesMap = (categoriesMap) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoriesMap);
