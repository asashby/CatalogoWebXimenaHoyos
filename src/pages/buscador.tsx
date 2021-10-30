import SearchContainer from 'container/SearchContainer';
import { Product } from 'models/Product';
import { ReactElement } from 'react';
import SearchService from 'services/SearchService';

const searchService = new SearchService();

type Props = {
	products: Product[];
	query: string;
};
const Search = ({ products, query }: Props): ReactElement => (
	<>
		<SearchContainer products={products} query={query} />
	</>
);

export const getServerSideProps = async ({ query }) => {
	const { q, commerceSlug } = query;

	const { data } = await searchService.searchProducts(q, commerceSlug);

	const products = Object.keys(data).map((key) => {
		return data[key];
	});

	return {
		props: {
			products,
			query: q
		}
	};
};

export default Search;
