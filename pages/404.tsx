import React from 'react';
import ErrorPage from '../src/components/error_page';

export default function Error() {
	return <ErrorPage src='404_error.json' desc='페이지를 찾을 수 없습니다.'/>;
}
