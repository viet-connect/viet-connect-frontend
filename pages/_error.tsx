import type { NextPage, NextPageContext } from 'next';
import ErrorPage from '../src/components/error_page';

type Props = {
	statusCode?: number;
};

const Error: NextPage<Props> = ({ statusCode }) => {
	const desc = statusCode
		? `${statusCode} - 서버에서 문제가 발생했습니다.`
		: '클라이언트에서 문제가 발생했습니다.';
	return <ErrorPage src="other_error.json" desc={desc} />;
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
	const statusCode = res?.statusCode || err.statusCode || 404;
	return { statusCode };
};

export default Error;
