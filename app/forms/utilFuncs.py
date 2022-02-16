def make_val_msgs(validation_errors):
    """
    turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append({field: error})
    return errorMessages
