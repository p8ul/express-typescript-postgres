import * as db from '../models';

/**
 * @func createOrUpdateProperty
 * @desc create or updates property in the database
 * @param {object} propertyDetails details about property to be created or updated
 * @param {number} propertyDetails.id id of the property
 * @param {string} propertyDetails.name name of the property
 */
export const createOrUpdateProperty = (propertyDetails) => db.Property.upsertById(propertyDetails);