import { Link, NavLink } from 'react-router-dom';
import { Category } from '../common/types/category.enum';
import {
	MagnifyingGlassIcon,
	ShoppingBagIcon,
	ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function Header() {
	const categories = Object.values(Category);

	const cartItems = useSelector((state: RootState) => state.cart.items);

	return (
		<header className='flex flex-wrap justify-between items-center p-4 bg-gray-800 text-white'>
			<h1 className='text-xl font-bold cursor-pointer'>
				<Link to='/'>QA Delivery App</Link>
			</h1>
			<nav>
				<ul className='flex flex-wrap gap-x-4'>
					<li className='cursor-pointer'>
						<Link to='/'>Home</Link>
					</li>
					{categories.map(category => (
						<li className='cursor-pointer' key={category}>
							<NavLink
								to={`/category/${category}`}
								className={({ isActive, isPending }) => {
									if (isActive) {
										return 'text-neutral-400';
									}
									if (isPending) {
										return 'text-neutral-200';
									}

									return 'text-white';
								}}>
								{category}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
			<div className='flex flex-nowrap'>
				<Link to='/dishes'>
					<MagnifyingGlassIcon className='size-7 mr-2' />
				</Link>
				<Link to='/orders'>
					<ShoppingBagIcon className='size-7 mr-2' />
				</Link>
				<Link className='cursor-pointer' to='/cart'>
					<div className='flex items-center justify-center'>
						<span className='bg-red-600 rounded-full px-2 text-s mr-2'>
							{cartItems?.length || 0}
						</span>
						<ShoppingCartIcon className='size-7' />
					</div>
				</Link>
			</div>
		</header>
	);
}
