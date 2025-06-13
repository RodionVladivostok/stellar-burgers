import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { newUserOrder, setLastOrder } from '../../services/slices/userSlice';
import { resetConstructor } from '../../services/slices/burgerConstructorSlice';
import { fetchFeeds } from '../../services/slices/feedsSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.success);
  const { constructorBun, constructorIngredients } = useSelector(
    (state) => state.constructorItems
  );
  const constructorItems = {
    bun: constructorBun,
    ingredients: constructorIngredients
  };
  const orderRequest = useSelector((state) => state.auth.orderRequestData);
  const orderModalData = useSelector((state) => state.auth.lastOrder);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;
    const ingredientsId: string[] = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (item: TConstructorIngredient) => item._id
      )
    ];

    dispatch(newUserOrder(ingredientsId));
    dispatch(resetConstructor());
    dispatch(fetchFeeds());
  };
  const closeOrderModal = () => dispatch(setLastOrder(null));

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
