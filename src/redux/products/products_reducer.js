const ADD_PRODUCT = "ADD_PRODUCT";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";

const initialState = [];

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return action.payload;
    case REMOVE_PRODUCT:
      return state.filter((product) => product.id !== action.payload.id);
    default:
      return state;
  }
}

export function addProduct(product) {
	console.log(product);
  return async (dispatch) => {
    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        Authorization: JSON.parse(localStorage.getItem("user")).token,
      },
      body: product,
    });
    const data = await response.json();
    console.log(data);
    dispatch({ type: ADD_PRODUCT, payload: data });
  };
}


// todo: add config for upload images of products in rails
  //  plan:
	// 1. Add ActiveStorage
		// run rails active_storage:install
		// run rails db:migrate
		// add has_one_attached :image to the product model
		// add serializer for product model with image
		  //  run rails g serializer product
			//  add attributes :id, :model, :price, :description, :image, :color
		// add image to the product params in the products controller #index
		  //  def index
				//  @products = Product.all
				//  @all_products = @products.map do |product|
				//    ProductSerializer.new(product).serializable_hash[:data][:attributes]
				// end
				// render json: @all_products, status: :ok
			//  end

