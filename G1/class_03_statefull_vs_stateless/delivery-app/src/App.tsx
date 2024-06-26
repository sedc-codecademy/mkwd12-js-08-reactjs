import { useEffect, useState } from 'react';
import Header from './components/Header';
import MainComponent from './components/MainContainer';
import { Category } from './common/types/category.enum';
import dishes from './data/dishes.json';
import CategoryPage from './components/Category';
import { Dish } from './common/types/dish.interface';
import Cart from './components/Cart';
import { CartItem } from './common/types/cart-item.interface';

export default function App() {
	// null is homepage
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null
	);
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	const [cartItemsCount, setCartItemsCount] = useState(0);

	const handleAddToCart = (dish: Dish) => {
		// check if dish is already in cart

		if (cartItems.some(cartItem => cartItem.dish.id === dish.id)) {
			handleQuantityChange(dish.id, 'increment');
			return;
		}

		// Dish doesn't exist in cart
		const cartItem = {
			dish,
			quantity: 1,
		} satisfies CartItem;
		setCartItems([...cartItems, cartItem]);
	};

	// const handleIncrementQuantity = (dishId: number) => {
	// 	const updatedCartItems = cartItems.map(cartItem => {
	// 		if (cartItem.dish.id === dishId) {
	// 			return {
	// 				...cartItem,
	// 				quantity: cartItem.quantity + 1,
	// 			};
	// 		}

	// 		return cartItem;
	// 	});

	// 	setCartItems(updatedCartItems);
	// };

	// const handleDecrementQuantity = (dishId: number) => {
	// 	const updatedCartItems = cartItems
	// 		.map(cartItem => {
	// 			if (cartItem.dish.id === dishId) {
	// 				return {
	// 					...cartItem,
	// 					quantity: cartItem.quantity - 1,
	// 				};
	// 			}

	// 			return cartItem;
	// 		})
	// 		.filter(item => item.quantity);

	// 	setCartItems(updatedCartItems);
	// };

	const handleQuantityChange = (
		dishId: number,
		typeOfChange: 'increment' | 'decrement'
	) => {
		const updatedCartItems = cartItems
			.map(cartItem => {
				if (cartItem.dish.id === dishId) {
					return {
						...cartItem,
						quantity:
							typeOfChange === 'increment'
								? cartItem.quantity + 1
								: cartItem.quantity - 1,
					};
				}

				return cartItem;
			})
			.filter(item => item.quantity);

		setCartItems(updatedCartItems);
	};

	useEffect(() => {
		setCartItemsCount(cartItems.reduce((sum, curr) => sum + curr.quantity, 0));
	}, [cartItems]);

	const handleCartClick = () => {
		setShowCart(!showCart);
		setSelectedCategory(null);
	};

	const handleCategorySelect = (category: Category | null) => {
		setSelectedCategory(category);
		setShowCart(false);
	};

	return (
		<div>
			<Header
				selectCategory={handleCategorySelect}
				handleCartClick={handleCartClick}
				cartItemsCount={cartItemsCount}
			/>
			{/* Home page */}
			{!selectedCategory && !showCart && (
				<MainComponent
					dishes={dishes as Dish[]}
					handleAddToCart={handleAddToCart}
				/>
			)}

			{/* Category pages */}
			{selectedCategory && (
				<CategoryPage
					category={selectedCategory}
					dishes={dishes as Dish[]}
					handleAddToCart={handleAddToCart}
				/>
			)}

			{/* Cart */}
			{showCart && (
				<Cart
					cartItems={cartItems}
					handleQuantityChange={handleQuantityChange}
				/>
			)}
		</div>
	);
}
