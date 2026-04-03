const { body, validationResult } = require('express-validator');

exports.validateProfile = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),
  body('role')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .escape(),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .escape(),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Must be a valid email'),
  body('profilePhoto')
    .optional()
    .trim()
    .isURL()
    .withMessage('Profile photo must be a valid URL'),
  body('socialLinks.github')
    .optional()
    .trim()
    .isURL()
    .withMessage('GitHub link must be a valid URL'),
  body('socialLinks.linkedin')
    .optional()
    .trim()
    .isURL()
    .withMessage('LinkedIn link must be a valid URL'),
  body('socialLinks.twitter')
    .optional()
    .trim()
    .isURL()
    .withMessage('Twitter link must be a valid URL'),
];

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
