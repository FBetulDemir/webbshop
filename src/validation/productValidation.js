import Joi from 'joi';

const productSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    'string.empty': 'Produktnamn är obligatoriskt.',
    'string.min': 'Produktnamn måste vara minst 2 tecken långt.',
  }),
  description: Joi.string().min(5).required().messages({
    'string.empty': 'Beskrivning är obligatorisk.',
    'string.min': 'Beskrivning måste vara minst 5 tecken.',
  }),
  price: Joi.number().positive().required().messages({
    'number.base': 'Pris måste vara ett nummer.',
    'number.positive': 'Pris måste vara positivt.',
    'any.required': 'Pris är obligatoriskt.',
  }),
  imageUrl: Joi.string().uri().required().messages({
    'string.empty': 'Bildlänk är obligatorisk.',
    'string.uri': 'Bildlänk måste vara en giltig URL.',
  }),
  isBestseller: Joi.boolean().optional(),
});

export default productSchema;
