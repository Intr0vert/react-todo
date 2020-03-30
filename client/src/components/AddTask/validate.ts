interface FormData {
    title: string,
    description: string
}

interface Errors {
    title?: string,
    description?: string,
}

const validate = (values: FormData) => {
    const {
        title,
        description,
    } = values;
    const errors: Errors = {};

    if (!title) {
        errors.title = "Title is required";
    } else if (title.length < 4) {
        errors.title = "Title is too short";
    } else if (!title.match(/^[0-9a-zA-Z ]*$/)) {
        errors.title = "Title must have only numbers or latin alphabet";
    }

    if (description && !description.match(/^[0-9a-zA-Z ]*$/)) {
        errors.description = "Description must have only numbers or latin alphabet";
    }

    return errors;
}

export default validate;