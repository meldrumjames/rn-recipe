import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVOURITE } from "../actions/meals";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favouriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      const existingIndex = state.favouriteMeals.findIndex(
        (meal) => meal.id === action.mealID
      );
      if (existingIndex >= 0) {
        const updatedFavs = [...state.favouriteMeals];
        updatedFavs.splice(existingIndex, 1);
        return { ...state, favouriteMeals: updatedFavs };
      } else {
        const meal = state.meals.find((meal) => meal.id === action.mealID);
        return { ...state, favouriteMeals: state.favouriteMeals.concat(meal) };
      }
    default:
      return state;
  }

  return state;
};

export default mealsReducer;
