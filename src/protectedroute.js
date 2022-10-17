import React from 'react';
import { Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { nftLink } from './common/link';

export default function ProtectedRoute({ component: Cmp, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) =>
				Cookies.get('auth') !== undefined ? (
					<Cmp {...props} />
				) : (
					<>
						{localStorage.removeItem('user')}
						{(window.location.href = `${nftLink}/login`)}
					</>
				)
			}
		/>
	);
}
