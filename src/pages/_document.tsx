import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext
} from 'next/document';
import { extractCritical } from 'emotion-server';

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		const styles = extractCritical(initialProps.html);

		return {
			...initialProps,
			styles: (
				<>
					{initialProps.styles}
					<style
						data-emotion-css={styles.ids.join(' ')}
						dangerouslySetInnerHTML={{ __html: styles.css }}
					/>
				</>
			)
		};
	}
	//renderGTMSnippetHead() {
	//	return (
	//		<script
	//			dangerouslySetInnerHTML={{
	//				__html: `
	//					(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	//					new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	//					j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	//					'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	//					})(window,document,'script','dataLayer','GTM-P5G4G7Z');
	//				`
	//			}}
	//		/>
	//	);
	//}

	//renderGTMSnippetBody() {
	//	return (
	//		<noscript
	//			dangerouslySetInnerHTML={{
	//				__html: `
	//					<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P5G4G7Z"
	//					height="0" width="0" style="display:none;visibility:hidden"></iframe>	
	//				`
	//			}}
	//		/>
	//	);
	//}

	render() {
		return (
			<Html lang="es">
				<Head>
					<meta charSet="UTF-8" />
					<link rel="shortcut icon" href="/images/favicon.ico" />

  				
					<link
						rel="preload"
						href="/fonts/dp6WebCalPeru.ttf?moeqnp"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/Poppins-Regular.ttf"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/Poppins-Medium.ttf"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/Poppins-SemiBold.ttf"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/Poppins-Bold.ttf"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/Poppins-ExtraBold.ttf"
						as="font"
						crossOrigin=""
					/>
				</Head>
				<body>

					<noscript></noscript>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
