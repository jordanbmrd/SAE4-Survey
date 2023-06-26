import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import SurveyLayout from 'layouts/survey';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { UserProvider, ProtectedRoute } from 'contexts/UserContext';


ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<ThemeEditorProvider>
				<UserProvider>
					<HashRouter>
						<Switch>
							<Route path={`/survey`} component={SurveyLayout} />
							<Route path={`/auth`} component={AuthLayout} />
							<ProtectedRoute path={`/admin`} component={AdminLayout} />
							<Redirect from='/' to='/survey' />
						</Switch>
					</HashRouter>
				</UserProvider>
			</ThemeEditorProvider>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);