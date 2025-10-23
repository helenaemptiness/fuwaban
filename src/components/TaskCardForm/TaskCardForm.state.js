export const INITIAL_STATE = {
	isValid: {
		task: true,
		deadline: true
	},
	values: {
		task: '',
		deadline: '',
		noDeadline: false
	},
	isFormReadyToSubmit: false
};

export function formReducer(state, action) {
    switch(action.type) {
        case 'SET_VALUE':
        return {
            ...state,
            values: {
            ...state.values,
            [action.payload.name]: action.payload.value
            }
        };

        case 'SET_IS_VALID':
            return {
                ...state,
                isValid: {
                    ...state.isValid,
                    [action.payload.name]: action.payload.isValid
                }
            };
            case 'SET_READY_TO_SUBMIT':
                return {
                    ...state,
                    isFormReadyToSubmit: action.payload
                };

            case 'RESET':
                return INITIAL_STATE;
            case 'RESET_TO_INITIAL':
                return {
                    ...state,
                    values: {
                        task: action.payload.task,
                        deadline: action.payload.deadline,
                        noDeadline: action.payload.noDeadline
                    }
                };
            default:
                return state;
    }  
}

export function validateInput(name, value, noDeadline) {
    switch (name) {
        case 'task':
            return Boolean(value.trim());
        case 'deadline':
            return noDeadline || Boolean(value);
        default:
            return true;
    }
}