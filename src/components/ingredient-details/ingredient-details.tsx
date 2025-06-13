import { FC } from 'react';
import { Preloader, IngredientDetailsUI } from '@ui';
import { useSelector } from '../../services/store';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const ingredientId = location.pathname.replace('/ingredients/', '');
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const ingredientData: TIngredient | undefined = ingredients.find(
    (ingredient) => ingredient._id === ingredientId
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
