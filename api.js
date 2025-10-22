import axios from "axios";

const API_BASE = "http://localhost:3001";

// done
export const loginUser = async (loginData) => {
    const response = await axios.post(`${API_BASE}/api/auth/login`, loginData);
    const userData = response.data;
    const token = userData?.token;
    const user = userData?.user;

    if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        return userData;
    } else {
        throw new Error("could not save token. Response from server: " + JSON.stringify(userData));
    }
};

// done
export const registerUser = async (registerData) => {
    const response = await axios.post(`${API_BASE}/api/auth/register`, registerData);
    const userData = response.data;
    ("my user data", userData);
};

// done
export const getAllUsers = async () => {
    try{
        const token = localStorage.getItem("token");
        const headers = {}
        if(token){
            headers.Authorization = `Bearer ${token}`
        }else{
            ("invalid token or no token: ")
        }
        
        const response = await axios.get(`${API_BASE}/api/users`, {headers})
        const usersData = response.data;
        ("all users succssfully gotten", usersData);

        return usersData


    }catch(error){
        ("internal server error", error.message)
        throw new Error ("could not get all users")
    }

}


// done
export const createProduct = async (productData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_BASE}/api/products`, productData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        const newProduct = response.data;
        ("product successfully created", newProduct);
        return newProduct;
    } catch (error) {
        ("internal server error", error.message);
        throw new Error("could not create product");
    }
};

// done
export const getAllProducts = async () => {
    try {
        const token = localStorage.getItem("token");
        const headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        const response = await axios.get(`${API_BASE}/api/products`, { headers });
        const productData = response.data;
        ("successfully gotten all products", productData);
        return productData;
    } catch (error) {
        ("internal server error", error.message);
        throw new Error("error getting all products");
    }
};

//  done
export const updateProduct = async (productId, productData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${API_BASE}/api/products/${productId}`, productData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        const updatedProduct = response.data;
        ("product successfully updated", updatedProduct);
        return updatedProduct;
    } catch (error) {
        ("internal server error", error.message);
        throw new Error("could not update product");
    }
};

//  done
export const deleteProduct = async (productId) => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_BASE}/api/products/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        ("product successfully deleted");
    } catch (error) {
        ("internal server error", error.message);
        throw new Error("could not delete product");
    }
};


// done
export const addToCart = async (cartData) => {
    try{
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_BASE}/api/cart`, cartData, {
            headers: {
                Authorization: `Bearer ${token}`,

            }
        })
        const updatedCart = response.data;
        return updatedCart;

    }catch(error){
        ("internal server error", error.message)
        throw new Error ("could not add to cart")
    }
}

export const getAllCarts = async ()


export const checkout = async (payout) => {
    try{
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_BASE}/api/order/checkout`, payout, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const updated = response.data;

        return updated;


    }catch(error){
        ("internal server error", error.message);
        throw new Error ("could not pay");
    }
}