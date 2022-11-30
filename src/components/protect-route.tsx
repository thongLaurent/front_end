import { AuthContext } from 'contexts/auth/auth.context';
import React from 'react';  
import Router from 'next/router'

export const withAuth = WrappedComponent => {
    const Wrapper = props => {
        const {
            authState: { isAuthenticated },
            authDispatch,
          } = React.useContext<any>(AuthContext);

       
        if (process.browser){
            //Runs only on client side
            if (!isAuthenticated) {
                console.log('Not Auth')
                Router.replace('/');
            }
        }

        return <WrappedComponent {...props} />
    }

    return Wrapper;
}
