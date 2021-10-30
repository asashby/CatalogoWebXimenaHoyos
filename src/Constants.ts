export const SHOW_ALL = 'Todos';
export const SHOW_BY_CATEGORY = 'Por Categoria';

export const ORDER_BY_LOWER_PRICE = 'Menor precio';
export const ORDER_BY_HIGHER_PRICE = 'Mayor precio';
export const ORDER_BY_DISCOUNT = 'Descuentos';

export const SHOW = 'YES';
export const HIDE = 'NO';

export const HAS_VARIATIONS = 5;

export const CATEGORY_ITEMS = [
	{
		name: 'Perú Moda',
		icon: 'moda',
		slug: 'peru-moda',
		subCategories: [
			{ name: 'Bebés', slug: 'bebes' },
			{ name: 'Ropa Mujer', slug: 'ropa-mujer' },
			{
				name: 'Ropa Niños y Adolescentes',
				slug: 'ropa-ninos-adolecentes'
			},
			{ name: 'Ropa y Accesorios', slug: 'ropa-accesorios' },
			{ name: 'Calzado Mujer', slug: 'calzado-mujer' },
			{ name: 'Calzado Hombre', slug: 'calzado-hombres' },
			{
				name: 'Carteras, Bolsos y Correas de Cuero',
				slug: 'carteras-bolsos'
			}
		]
	},
	{
		slug: 'peru-salud',
		name: 'Perú Salud y Belleza',
		icon: 'pharmacy',
		subCategories: [
			{ name: 'Cosméticos', slug: 'cosmeticos' },
			{ name: 'Ciudado de piel', slug: 'cuidado-piel' },
			{
				name: 'Mascarillas, Alcohol y Accesorios',
				slug: 'mascarillas-accesorios'
			},
			{ name: 'Infusiones y Hierbas', slug: 'infusiones-filtrantes' },
			{ name: 'Plantas Medicinales', slug: 'plantas-medicinales' }
		]
	},
	{
		name: 'Perú Gourmet',
		icon: 'gourmet',
		slug: 'peru-gourmet',
		subCategories: [
			{ name: 'Cacao y Chocolate', slug: 'cacao-chocolate' },
			{ name: 'Cafés y derivados', slug: 'cafes-derivados' },
			{ name: 'Vinos y piscos', slug: 'vinos-piscos' },
			{ name: 'Aderezos, salsas y especies', slug: 'aderezos-salsas' },
			{ name: 'Licores y Macerados', slug: 'licores-macerados' },
			{ name: 'Delicias de la selva', slug: 'delicias-selva' }
		]
	},
	{
		name: 'Perú Orgánico',
		icon: 'vegetables',
		slug: 'peru-organico',
		subCategories: [
			{ slug: 'super-alimentos', name: 'Súper Alimentos' },
			{ slug: 'jugos-naturales', name: 'Jugos naturales' },
			{ slug: 'snacks', name: 'Snacks' }
		]
	},
	{
		name: 'Perú Tech',
		icon: 'tech',
		slug: 'peru-tech',
		subCategories: [
			{
				name: 'Televisores, Pantallas Led y Equipos de Sonido',
				slug: 'televisores-computadoras'
			},
			{
				name: 'Computadoras, Impresoras y Componentes',
				slug: 'computadoras-tablets-impresoras'
			},
			{
				name: 'Accesorios y Periféricos',
				slug: 'accesorios-perifericos'
			}
		]
	},
	{
		slug: 'peru-hogar-oficina',
		name: 'Perú Hogar - Oficina',
		icon: 'home',
		subCategories: [
			{ slug: 'domotica-gadgets', name: 'Domótica y Gadgets' },
			{ slug: 'muebles', name: 'Muebles' },
			{ slug: 'muebles-sala', name: 'Muebles para Sala y Comedor' },
			{ slug: 'utilitarios-madera', name: 'Utilitarios de Madera' },
			{ slug: 'articulos-limpieza', name: 'Artículos de limpieza' }
		]
	},
	{
		slug: 'peru-regalos',
		name: 'Perú Regalos',
		icon: 'gift',
		subCategories: [
			{ slug: 'joyeria', name: 'Joyería' },
			{ slug: 'pinturas-oleos', name: 'Pinturas y Óleos' },
			{ slug: 'arte-entretenimiento', name: 'Arte y entretenimiento' },
			{ slug: 'tomatodo-tazas', name: 'Tazas y Tomatodo' },
			{ slug: 'escultura', name: 'Escultura' }
		]
	},
	{
		name: 'Perú Turismo',
		slug: 'peru-tours',
		icon: 'viajes',
		subCategories: [
			{ slug: 'turismo', name: 'Tours y Paquetes Turísticos' }
		]
	},
	{
		name: 'Perú Automotriz',
		icon: 'automotriz',
		slug: 'peru-automotriz',
		subCategories: [
			{ slug: 'limpieza-automovil', name: 'Limpieza Automóvil' }
		]
	},
	{
		name: 'Perú Educación',
		icon: 'eduacion',
		slug: 'peru-educacion',
		subCategories: [{ name: 'Cursos Online', slug: 'cursos-online' }]
	}
];

export const SOCIAL_ITEMS = [
	{
		name: 'fb',
		link: 'https://www.facebook.com/compralealperu.pe'
	},
	{
		name: 'instagran',
		link: 'https://www.instagram.com/compralealperuoficial/'
	}
];

export const CONTACT_ITEMS = [
	{
		name: 'email',
		link: 'mailto:digitalizame@capece.org.pe',
		value: 'digitalizame@capece.org.pe'
	}
];

// TODO: remove these mock data examples

export const ITEMS = [
	{
		id: '1',
		webImage: '/images/home/BANER-FIRST-PRO.jpg',
		link: '/tienda/insumos-first-pro'
	},
	{
		id: '2',
		webImage: '/images/home/BannerG-Perubebe.jpg',
		link: '/tienda/peru-bebe'
	},
	{
		id: '3',
		webImage: '/images/home/BANNER-MAYO.jpg',
		link: '/tienda/muebleria-mayo'
	},
	{
		id: '4',
		webImage: '/images/home/Banner-1-stand.jpg',
		link: '/tienda/cursos-online'
	},
	{
		id: '5',
		webImage: '/images/home/Banner-e-Market-Feria-CAPACE.jpg',
		link: '/tienda/emarket'
	},
	{
		id: '6',
		webImage: '/images/home/banner-eterna.jpg',
		link: '/tienda/eterna'
	},
	{
		id: '7',
		webImage: '/images/home/casamarket.jpg'
	},
	{
		id: '8',
		webImage: '/images/home/burana.jpg',
		link: '/tienda/burana'
	}
];

export const MOBILE_REGEX = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
