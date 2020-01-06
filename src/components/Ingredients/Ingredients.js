import React, { useReducer, useEffect, useCallback, useMemo } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

//Hooks
import useHttp from "../../hooks/http";

const ingredientsReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "REMOVE":
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error("This is no man s land!");
  }
};

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientsReducer, []);
  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifier,
    clear
  } = useHttp();

  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === "REMOVE_INGREDIENT") {
      dispatch({ type: "REMOVE", id: reqExtra });
    } else if (!isLoading && !error && reqIdentifier === "ADD_INGREDIENT") {
      dispatch({
        type: "ADD",
        ingredient: { id: data.name, ...reqExtra }
      });
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const addIngredientHandler = useCallback(
    ingredient => {
      sendRequest(
        "https://react-hooks-b3c78.firebaseio.com/ingredients.json",
        "POST",
        JSON.stringify(ingredient),
        ingredient,
        "ADD_INGREDIENT"
      );
    },
    [sendRequest]
  );

  const removeIngredientHandler = useCallback(
    id => {
      sendRequest(
        `https://react-hooks-b3c78.firebaseio.com/ingredients/${id}.json`,
        "DELETE",
        null,
        id,
        "REMOVE_INGREDIENT"
      );
    },
    [sendRequest]
  );

  const filteredIngredientsHandler = useCallback(ingredients => {
    dispatch({ type: "SET", ingredients: ingredients });
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        isLoading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
