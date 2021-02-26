import { MEALS } from "../../data/dummy-data";
import { SET_FILTERS, TOGGLE_FAVOURITE } from "../actions/meals";
import { SETFILTERS } from "../actions/meals";

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
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        return true;
      });
      return { ...state, filteredMeals: updatedFilteredMeals };
    default:
      return state;
  }
  return state;
};

export default mealsReducer;
