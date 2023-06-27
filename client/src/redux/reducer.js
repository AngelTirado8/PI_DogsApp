const initialState = {
  dogs: [],
  allDogs: [], //es una copia de dogs, sirve para hacer el filtro sobre esta prop y no sobre dogs para q no haya problemas como q filtramos un array ya filtrado
  temperaments: [],
  details: [],

  //pagination states
  actualPage: 1,
  minPageNumber: 0,
  maxPageNumber: 5
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        allDogs: action.payload,
        // dogs: action.payload
      };

    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };

    case "GET_BY_NAME":
      console.log(action)
      console.log(initialState)
      return {
        ...state,
        allDogs: action.payload,
      };

    case "GET_BY_ID":
      return {
        ...state,
        details: action.payload,
      };

    case 'CLEAR_DETAIL':
      return {
        ...state,
        details: []
      };

    case "SORT_BY_NAME":
  if (state.allDogs === 'Dog not found :(') return { ...state };
  const orderedByName =
    action.payload === "ascendente"
      ? state.allDogs.slice().sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        })
      : state.allDogs.slice().sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
  return {
    ...state,
    allDogs: orderedByName,
};

case "SORT_BY_WEIGHT":
  if (state.allDogs === 'Dog not found :(') return { ...state };
  const orderedByWeight =
    action.payload === "menor"
      ? state.allDogs.slice().sort((a, b) => {
          if (a.weight.metric > b.weight.metric) return 1;
          if (a.weight.metric < b.weight.metric) return -1;
          return 0;
        })
      : state.allDogs.slice().sort((a, b) => {
          if (a.weight.metric < b.weight.metric) return 1;
          if (a.weight.metric > b.weight.metric) return -1;
          return 0;
        });
  return {
    ...state,
    allDogs: orderedByWeight,
};

    

    case "FILTER_BY_TEMPERAMENT":
  const allDogs = state.allDogs;
  const filteredByTemperament =
    action.payload === "all"
      ? allDogs
      : allDogs.filter((d) => d.temperaments?.includes(action.payload));
  return {
    ...state,
    dogs: filteredByTemperament,
  };

case "FILTER_CREATED":
  const allDogs2 = state.allDogs;
  let filteredByCreation = null;
  if (action.payload === "all") {
    filteredByCreation = allDogs2;
  } else if (action.payload === "created") {
    filteredByCreation = allDogs2.filter((dog) => dog.createdInDB);
  } else if (action.payload === "api") {
    filteredByCreation = allDogs2.filter((dog) => !dog.createdInDB);
  }
  return {
    ...state,
    dogs: filteredByCreation,
  };


    case "CREATE_DOG":
      return {
        ...state,
        dogs: action.payload,
      };

    case "DELETE_DOG":
      return {
        ...state,
      };
    
    case "EDIT_DOG":
      return {
        ...state,
      };

    //pagination
    case 'SET_ACTUAL_PAGE':
      return {
        ...state,
        actualPage: action.payload
      };

    case 'SET_MIN_PAGE_NUMBER':
      return {
        ...state,
        minPageNumber: action.payload
      };

    case 'SET_MAX_PAGE_NUMBER':
      return {
        ...state,
        maxPageNumber: action.payload
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
