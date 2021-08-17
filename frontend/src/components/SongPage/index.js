import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function SongPage() {
	const { songId } = useParams();

	return <div class="main"></div>;
}
