const { body, validationResult } = require('express-validator');

exports.validateSkill = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Skill name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .escape(),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .escape(),
  body('level')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Level must be between 0 and 100'),
  body('color')
    .optional()
    .trim()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Color must be a valid hex color'),
];

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
