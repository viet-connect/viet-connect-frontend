import React from 'react';
import ErrorPage from '../src/components/error_page';

export default function Error() {
	return <ErrorPage src="500_error.json" desc="서버 에러가 발생했습니다." />;
}
