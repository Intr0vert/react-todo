import {
    FormState,
    FormAction,
    ChangeTitleAction,
    ChangeDescriptionAction,
    ChangeFieldsErrorAction
} from "../types/form";

export const CHANGE_FIELDS_ERROR = 'CHANGE_FIELDS_ERROR';
export const CHANGE_TITLE = 'CHANGE_TITLE';
export const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';

const initialState = {
    title: '',
    description: '',
    error: null
}

const ChangeTitle = (title: string): ChangeTitleAction => ({
    type: CHANGE_TITLE,
    payload: title
});

const ChangeDescription = (description: string): ChangeDescriptionAction => ({
    type: CHANGE_DESCRIPTION,
    payload: description
});

const ChangeFieldsError = (error: string|null): ChangeFieldsErrorAction => ({
    type: CHANGE_FIELDS_ERROR,
    payload: error
});

export default function form(state: FormState = initialState, action: FormAction) {
    switch (action.type) {
        case CHANGE_TITLE:
            return {
                ...state,
                title: action.payload
            };
        case CHANGE_DESCRIPTION:
            return {
                ...state,
                description: action.payload
            };
        case CHANGE_FIELDS_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}

export {
    ChangeTitle,
    ChangeDescription,
    ChangeFieldsError,
}