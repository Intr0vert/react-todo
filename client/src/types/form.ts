import {
    CHANGE_TITLE,
    CHANGE_DESCRIPTION,
    CHANGE_FIELDS_ERROR
} from '../ducs/form'
import { AbstractAction } from "./action";

export interface FormState {
    title: string;
    description: string;
    error: string | null;
}

export type ChangeTitleAction = AbstractAction<typeof CHANGE_TITLE, string>;
export type ChangeDescriptionAction = AbstractAction<typeof CHANGE_DESCRIPTION, string>;
export type ChangeFieldsErrorAction = AbstractAction<typeof CHANGE_FIELDS_ERROR, string | null>;

export type FormAction =
    ChangeTitleAction |
    ChangeDescriptionAction |
    ChangeFieldsErrorAction;