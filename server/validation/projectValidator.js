const { body, validationResult } = require('express-validator');

exports.validateProject = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters')
    .escape(),
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters')
    .escape(),
  body('tech')
    .isArray({ min: 1 })
    .withMessage('At least one technology must be specified'),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .escape(),
  body('image')
    .optional()
    .trim()
    .isURL()
    .withMessage('Image must be a valid URL'),
  body('demoLink')
    .optional()
    .trim()
    .isURL()
    .withMessage('Demo link must be a valid URL'),
  body('githubLink')
    .optional()
    .trim()
    .isURL()
    .withMessage('GitHub link must be a valid URL'),
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
];

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
