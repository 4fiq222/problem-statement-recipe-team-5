import { createContext, useReducer } from 'react';

export const RecipesContext = createContext();

export const recipesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RECIPES':
      return {
        recipes: action.payload,
      };

    case "CREATE_RECIPE":
    return { recipes: [action.payload, ...state.recipes] 
    };

    case "UPDATE_RECIPE":
    return {
      recipes: state.recipes.map((recipe) =>
        recipe._id === action.payload._id ? action.payload : recipe
      ),
    };

    case "DELETE_RECIPE":
    return { recipes: state.recipes.filter((recipe) => recipe._id !== action.payload) 
    };

    case 'LOGOUT':
      return {
        recipes: null,
      };
    default:
      return state;
  }
};

export const RecipesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipesReducer, {
    recipes: [],
  });

  return (
    <RecipesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RecipesContext.Provider>
  );
};