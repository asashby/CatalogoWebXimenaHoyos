import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import {
	createContext,
	// useContext,
	useEffect,
	useState,
	useMemo,
	useCallback,
	ReactElement
} from 'react';
import Router from 'next/router';
import getConfig from 'next/config';

import { ThemeProvider } from 'emotion-theming';

import NProgress from 'nprogress';

import '../styles/global.scss';

import CartContext from 'contexts/CartContext';
import AuthContext from 'contexts/AuthContext';

import {
	// Footer,
	MobileFooter
} from 'components/Footer/Footer.component';
import { SHOW } from 'Constants';
import { useViewport } from 'hooks/useViewport';
import LoginModal from 'components/LoginModal';
import CartModal from 'components/CartModal';
import theme from '../theme/theme';

import Container from 'components/Container';
import Page from 'components/Page';
import Header from 'components/Header';
// import Navigation from 'components/Navigation';
import { CartMobile } from 'components/Cart';
import CategoriesMenu from 'components/CategoriesMenu';
import { SearchMobile } from 'components/SearchMobile';
import BankAccountService from 'services/BankAccountService';

const { publicRuntimeConfig } = getConfig();
const { applicationConfig } = publicRuntimeConfig;

const bankAccountService = new BankAccountService();

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => {
	NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export type AppContextProps = {
	isMobile: boolean;
	closeLoginModal: () => void;
	openLoginModal: () => void;
	openCartModal: () => void;
	closeCartModal: () => void;
};

export const AppContext = createContext<AppContextProps | undefined>(undefined);

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
	const { width } = useViewport();
	const router = useRouter();
	const [banks, setBanks] = useState([]);

	const [isMobile, setIsMobile] = useState<boolean>(false);

	const { pathname, query, replace } = router;

	const isHomePage = useMemo(() => {
		return pathname === '/';
	}, [pathname]);

	const isCategoryPage = useMemo(() => {
		return pathname.startsWith('/categoria');
	}, [pathname]);

	const isErrorPage = useMemo(() => {
		return (
			pathname === '/404' || [404, 500].includes(pageProps?.statusCode)
		);
	}, [pathname]);

	const showPageTitle = useMemo(() => {
		return (
			pathname.includes('/tienda') ||
			pathname === '/categoria/[categorySlug]/[subcategorySlug]'
		);
	}, [pathname]);

	const isMicroSite = useMemo(() => {
		return (
			pathname === '/tienda/[commerceSlug]/[productSlug]' ||
			pathname === '/tienda/[commerceSlug]'
		);
	}, [pathname]);

	const isBuscador = useMemo(() => {
		return pathname === '/buscador';
	}, [pathname]);

	const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
	const [isDisplayingSearch, setIsDisplayingSearch] = useState<boolean>(
		false
	);
	const [isOpenCartModal, setIsOpenCartModal] = useState<boolean>(false);
	const [isDisplayingCart, setIsDisplayingCart] = useState<boolean>(false);
	const [isDisplayingCategories, setIsDisplayingCategories] = useState<
		boolean
	>(false);

	const loadBank = async () => {
		try {
			const response = await bankAccountService.getBankAccount(
				pageProps.commerce?.data?.tokenStore ||
					pageProps.commerceData.tokenStore
			);
			setBanks(response.data);
		} catch (err) {
			console.log('Error:', err);
		}
	};

	useEffect(() => {
		loadBank();
	}, []);

	const openLoginModal = useCallback((): void => {
		setIsLoginModalOpen(true);
	}, []);

	const closeLoginModal = useCallback((): void => {
		setIsLoginModalOpen(false);
		unselectItem();
	}, []);

	const openCartModal = useCallback((): void => {
		setIsOpenCartModal(true);
	}, []);

	const closeCartModal = useCallback((): void => {
		setIsOpenCartModal(false);
	}, []);

	const [selectedMobileMenuItem, setSelecteMobileMenuItem] = useState<string>(
		''
	);

	const unselectItem = useCallback(
		(newItem?: string) => {
			setSelecteMobileMenuItem(newItem ? newItem : '');
		},
		[selectedMobileMenuItem]
	);

	const closeAll = (item: string) => {
		if (item !== 'login' && isLoginModalOpen) {
			setIsLoginModalOpen(false);
		}

		if (item !== 'search' && isDisplayingSearch) {
			setIsDisplayingSearch(false);
		}

		if (item !== 'categories' && isDisplayingCategories) {
			setIsDisplayingCategories(false);
		}

		if (item !== 'cart' && isDisplayingCart) {
			setIsDisplayingCart(false);
		}
	};

	useEffect(() => {
		if (isHomePage) {
			router.push(`/tienda/${applicationConfig.commerceName}`);
		} else if (!(isBuscador || isMicroSite)) {
			router.push(`/tienda/${applicationConfig.commerceName}/404`);
		}
	}, [pathname]);

	useEffect(() => {
		setIsMobile(width < +theme.breakpoints['lg'].replace('px', ''));
	}, [width]);

	useEffect(() => {
		unselectItem();

		if (query.login === 'true') {
			openLoginModal();
		}
	}, [query]);

	useEffect(() => {
		closeAll(selectedMobileMenuItem);

		document.body.style.overflow = !['', '/'].includes(
			selectedMobileMenuItem
		)
			? 'hidden'
			: 'scroll';

		switch (selectedMobileMenuItem) {
			case '/':
				if (pathname !== '/') {
					replace('/');
				}

				break;
			case '/perfil':
				if (pathname !== '/perfil') {
					replace('/perfil');
				}

				break;
			case 'login':
				setIsLoginModalOpen(true);
				break;
			case 'search':
				setIsDisplayingSearch(true);
				break;
			case 'categories':
				setIsDisplayingCategories(true);
				break;
			case 'cart':
				setIsDisplayingCart(true);
				break;
		}
	}, [selectedMobileMenuItem]);

	return (
		<>
			<AppContext.Provider
				value={{
					closeLoginModal,
					openLoginModal,
					isMobile,
					openCartModal,
					closeCartModal
				}}
			>
				<AuthContext>
					<CartContext>
						<ThemeProvider theme={theme}>
							{isLoginModalOpen && <LoginModal />}
							{isOpenCartModal && (
								<CartModal
									closeCartModal={closeCartModal}
									commerceData={
										pageProps.commerce?.data ||
										pageProps.commerceData
									}
									banks={banks}
								/>
							)}
							{isMobile ? (
								<>
									<CategoriesMenu
										show={isDisplayingCategories}
										close={unselectItem}
									/>
									<SearchMobile
										show={isDisplayingSearch}
										close={unselectItem}
									/>
									<CartMobile
										show={isDisplayingCart}
										close={unselectItem}
										commerceData={pageProps?.commerce?.data}
										banks={banks}
									/>
								</>
							) : null}
							<Container>
								<>
									{/* <Navigation /> */}
									<Header
										commerceName={pageProps?.commerceName}
										commerceLogo={pageProps?.commerceLogo}
										showCategories={false}
									/>
									<Page
										commerceName={pageProps?.commerceName}
										showRealTimeInfo={
											applicationConfig.showRealTimeInfo ===
											SHOW
										}
										showCommerceName={showPageTitle}
										isErrorPage={isErrorPage}
										isHome={isHomePage}
										isCategory={isCategoryPage}
										hideCart={pageProps?.hideCart}
									>
										<Component
											{...pageProps}
											isMobile={isMobile}
										/>
									</Page>
									{/* <Footer /> */}
									{isMobile ? (
										<MobileFooter
											selectedItem={
												selectedMobileMenuItem
											}
											selectItem={
												setSelecteMobileMenuItem
											}
										/>
									) : null}
								</>
							</Container>
						</ThemeProvider>
					</CartContext>
				</AuthContext>
			</AppContext.Provider>
		</>
	);
};

export default MyApp;
