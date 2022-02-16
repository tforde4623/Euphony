def make_val_msgs(validation_errors) -> dict:
	"""
	turns the WTForms validation errors into a simple list
	"""
	errorMessages = {}
	for field in validation_errors:
		for error in validation_errors[field]:
			if field in errorMessages:
				errorMessages[field].append(error)
			else:
				errorMessages[field] = [error]

	return errorMessages
