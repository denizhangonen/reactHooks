import React, { useReducer, useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

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

const httpReducer = (curHttpState, action) => {  
  switch (action.type) {
    case "SEND":
      return { ...curHttpState, loading: true, error: null };
    case "RESPONSE":
      return { ...curHttpState, loading: false };
    case "ERROR":
      return { ...curHttpState, loading: false, error: action.errorMessage };
    case "CLEAR":
      return { ...curHttpState, error: null };
    default:
      return new Error("This is no man s land!");
  }
};

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientsReducer, []);
  // const [userIngredients, setUserIngredients] = useState([]);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null
  });
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const addIngredientHandler = ingredient => {
    // setIsLoading(true);
    dispatchHttp({ type: "SEND" });
    fetch("https://react-hooks-b3c78.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        dispatchHttp({type:'RESPONSE'})        
        return response.json();
      })
      .then(responseData => {
        // setUserIngredients(prevIngredients => [
        //   ...prevIngredients,
        //   { id: responseData.name, ...ingredient }
        // ]);
        dispatch({
          type: "ADD",
          ingredient: { id: responseData.name, ...ingredient }
        });
      });
  };

  const removeIngredientHandler = id => {    
    dispatchHttp({type:'SEND'})
    fetch(`https://react-hooks-b3c78.firebaseio.com/ingredients/${id}.json`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        dispatchHttp({type:'RESPONSE'})
        // setUserIngredients(prevIngredients =>
        //   prevIngredients.filter(i => i.id.toString() !== id.toString())
        // );
        dispatch({ type: "REMOVE", id: id });
      })
      .catch(error => {        
        dispatchHttp({type: 'ERROR', errorMessage: "Something Went Wrong: " + error.message})
      });
  };

  const filteredIngredientsHandler = useCallback(ingredients => {
    // setUserIngredients(ingredients);
    dispatch({ type: "SET", ingredients: ingredients });
  }, []);

  const removeError = () => {
    dispatchHttp({type:'CLEAR'})
  };

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={removeError}>{httpState.error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        isLoading={httpState.loading}
      />

      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {/* Need to add list here! */}
      </section>
    </div>
  );
};

export default Ingredients;
