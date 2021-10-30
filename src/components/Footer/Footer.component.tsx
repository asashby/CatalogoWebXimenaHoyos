import { memo, ReactElement, useContext, useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import {
	FooterStyled,
	MobileFooterStyled,
	MobileFooterMenu,
	MobileFooterMenuItem
} from './Footer.styles';
import { SOCIAL_ITEMS } from 'Constants';
import CartIcon from 'components/icons/CartIcon';
import { CartContext } from 'contexts/CartContext';
import { AuthContext } from 'contexts/AuthContext';

export const Footer = memo(() => {
	return (
		<FooterStyled>
			<div className="flex max-layout-width footer-header-container">
				<div className="center footer-header-item">
					<h4>Una iniciativa de:</h4>
					<picture>
						<LazyLoadImage
							src="/images/capece.png"
							srcSet="/images/capece@2x.png 2x, /images/capece@3x.png 3x"
							alt="Capece"
						/>
					</picture>
				</div>
				<div className="center footer-header-item">
					<h4>Con la tecnología:</h4>
					<picture>
						<LazyLoadImage
							src="/images/casamarket.png"
							srcSet="/images/casamarket@2x.png 2x, /images/casamarket@3x.png 3x"
							alt="Casamarket"
						/>
					</picture>
				</div>
			</div>
			<hr className="max-layout-width" />
			<div className="contact-main-container max-layout-width">
				<div className="compralealperu-logo-container">
					<LazyLoadImage
						className="logo"
						src="/images/logo-footer.png"
						srcSet="/images/logo-footer@2x.png 2x, /images/logo-footer@3x.png 3x"
						alt="Confianza Online"
					/>
					<p>
						Somos la primera aceleradora Ecommerce para MYPES. Las
						principales marcas del país se unen para ayudar y
						entrenar a las microempresas a vender en Internet de
						manera efectiva y segura.
					</p>
				</div>
				<div className="contact-container">
					<h4 className="contact-title bold">Datos de contacto</h4>
					<ul>
						<li>
							<a href="mailto:digitalizame@capece.org.pe">
								digitalizame@capece.org.pe
							</a>
						</li>
					</ul>
				</div>
				<div className="contact-container">
					<h4 className="contact-title bold">Tienda online</h4>
					<ul>
						<li>
							<a
								href="/Términos_y_Condiciones_Marketplace.pdf"
								target="_blank"
								rel="noreferrer"
							>
								Términos y condiciones
							</a>
						</li>
						<li>
							<a
								href="/Política_de_Privacidad-CAP.pdf"
								target="_blank"
								rel="noreferrer"
							>
								Política de privacidad
							</a>
						</li>
						<li>
							<a
								href="/Politicas_de_envio.pdf"
								target="_blank"
								rel="noreferrer"
							>
								Política de entrega
							</a>
						</li>
						<li>
							<a
								href="/Politica_de_devoluciones.pdf"
								target="_blank"
								rel="noreferrer"
							>
								Política de devoluciones
							</a>
						</li>
						<li>
							<a
								href="https://www.ecommerceacademy.pe/diplomado-comercio-electronico-diplomado-marketing-digital/"
								target="_blank"
								rel="noreferrer"
							>
								Estudia comercio electrónico
							</a>
						</li>
						<li>
							<a
								href="https://www.indecopi.gob.pe/libro-de-reclamaciones"
								target="_blank"
								rel="noreferrer"
							>
								Libro de reclamaciones
							</a>
						</li>
					</ul>
				</div>
				<div className="be-friends-container">
					<h4 className="contact-title bold">¿Podemos ser amigos?</h4>
					<div className="rrss-container">
						{SOCIAL_ITEMS.map((item) => (
							<a
								key={`Footer-be-friends-social-item-${item.name}`}
								href={item.link}
								target="_blank"
								rel="noreferrer"
								aria-label={item.name}
							>
								<i
									className={`icon-${item.name} icon-rrss-footer`}
								/>
							</a>
						))}
					</div>
				</div>
			</div>
		</FooterStyled>
	);
});

type MobileFooterProps = {
	selectedItem: string;
	selectItem: (value: string) => void;
};

export const MobileFooter = ({
	selectedItem,
	selectItem
}: MobileFooterProps): ReactElement => {
	const { cart } = useContext(CartContext);
	const { user } = useContext(AuthContext);

	const quantity = useMemo(() => {
		return cart.length;
	}, [cart]);

	const handleAction = (evt: React.MouseEvent): void => {
		const action = evt.currentTarget.getAttribute('data-action');

		if (action !== selectedItem) {
			selectItem(action);
		}
	};

	return (
		<MobileFooterStyled className="center">
			<MobileFooterMenu className="flex row">
				<MobileFooterMenuItem
					className={selectedItem === '/' ? 'active' : ''}
					data-action="/"
					onClick={handleAction}
				>
					<i className="icon-home" />
					<span className="medium">Inicio</span>
				</MobileFooterMenuItem>
				<MobileFooterMenuItem
					className={selectedItem === 'search' ? 'active' : ''}
					data-action="search"
					onClick={handleAction}
				>
					<i className="icon-search"></i>
					<span className="medium">Buscar</span>
				</MobileFooterMenuItem>
				<MobileFooterMenuItem
					className={selectedItem === 'cart' ? 'active' : ''}
					data-action="cart"
					onClick={handleAction}
				>
					<CartIcon
						color={selectedItem === 'cart' ? '#2ABCA4' : '#c8c8c8'}
						quantity={quantity}
					/>
					<span className="medium">Carrito</span>
				</MobileFooterMenuItem>
			</MobileFooterMenu>
		</MobileFooterStyled>
	);
};
