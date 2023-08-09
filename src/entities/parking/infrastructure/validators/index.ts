import { body, param, query } from 'express-validator';
import middleware from '../../../../core/middlewares/expressValidation';
import { customValidationForSpots } from '../../../../core/utils';
import { ALL_PARKING_TYPES } from '../../application/constants';

const MAX_LIMIT = 100;
const MIN_LIMIT = 10;

export const createV = () => {
  const params = [
    body('name').isString().not().isEmpty().escape().trim(),
    body('spots').isInt().custom(customValidationForSpots),
    body('contact').isString().not().isEmpty().escape().trim(),
    body('parkingType').escape().trim().not().isEmpty().isIn(ALL_PARKING_TYPES),
  ];

  return [params, middleware];
};

export const updateV = () => {
  const params = [
    body('spots').isInt().custom(customValidationForSpots),
    body('contact').isString().not().isEmpty().escape().trim(),
    param('id').isString().not().isEmpty().escape().trim(),

    /**
     * Prevent injections
     */
    body('name').not().exists(),
    body('parkingType').not().exists(),
  ];

  return [params, middleware];
};

export const paginateV = () => {
  const params = [
    query('limit')
      .optional()
      .isInt()
      .customSanitizer((v) => {
        if (v > MAX_LIMIT) return MAX_LIMIT;
        if (v < MIN_LIMIT) return MIN_LIMIT;
        return Math.ceil(v);
      }),
    query('order').optional().isIn(['name', 'spots', 'parkingType']),
    query('skip').optional().isInt(),
    query('sort').escape().trim().not().isEmpty().isIn(['asc', 'desc']),
  ];

  return [params, middleware];
};
