import useSearchStore from '@/store/searchStore';
import usePlacesStore, { Place } from '@/store/placesStore';
import { useEffect, useRef } from 'react';

declare global {
	interface Window {
		kakao: any;
	}
}

export default function KakaoMap() {
	const mapRef = useRef<HTMLDivElement>(null);
	const searchKeyword = useSearchStore(state => state.keyword);
	const usePlaces = usePlacesStore(state => state.setPlaces);

	useEffect(() => {
		window.kakao.maps.load(() => {
			const options = {
				//지도를 생성할 때 필요한 기본 옵션
				center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
				level: 5, //지도의 레벨(확대, 축소 정도)
			};

			const map = new window.kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴

			// var infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

			if (navigator.geolocation) {
				// 브라우저가 위치 정보를 지원하는지 확인
				navigator.geolocation.getCurrentPosition(
					position => {
						const { latitude, longitude } = position.coords;
						const currentPos = new window.kakao.maps.LatLng(latitude, longitude);

						// 지도의 중심을 현재 위치로 설정
						map.setCenter(currentPos);

						// 현재 위치에 마커 표시
						const marker = new window.kakao.maps.Marker({
							map: map,
							position: currentPos,
						});
					},
					error => {
						console.error('Error getting geolocation:', error.message);
					},
				);
			}

			if (searchKeyword) {
				if (window.kakao && window.kakao.maps) {
					const places = new window.kakao.maps.services.Places();
					places.keywordSearch(searchKeyword, (result: string | any[], status: any) => {
						if (status === window.kakao.maps.services.Status.OK) {
							const bounds = new window.kakao.maps.LatLngBounds();
							const locationArr: Place[] = [];

							// 최대 표시할 마커 개수 설정할 경우 사용
							// const maxMarkers = 5;
							// for (let i = 0; i < Math.min(result.length, maxMarkers); i++) {
							for (let i = 0; i < result.length; i++) {
								displayMarker(result[i], map);
								locationArr.push(result[i]);
								bounds.extend(new window.kakao.maps.LatLng(result[i].y, result[i].x));
							}
							map.setBounds(bounds);
							// console.log('locationArr check::', locationArr);
							usePlaces(locationArr);
						}
					});
				}
			}
			let currentOverlay: { setMap: (arg0: null) => void } | null = null;

			function displayMarker(place: { y: any; x: any; place_name: any }, map: undefined) {
				const position = new window.kakao.maps.LatLng(place.y, place.x);
				const marker = new window.kakao.maps.Marker({
					map: map,
					position: position,
				});

				//@TODO 오버레이 스타일 코드 tailwindCSS 로 수정
				const overlay = new window.kakao.maps.CustomOverlay({
					content: `<div class="overlay" style="background-color: white; color: black; padding: 8px; border-radius: 4px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);">${place.place_name}</div>`,
					position: position,
					yAnchor: 2.2,
					zIndex: 3,
				});

				// 마커에 마우스오버 이벤트 등록
				window.kakao.maps.event.addListener(marker, 'click', () => {
					// overlay.setMap(map);
					if (currentOverlay) {
						currentOverlay.setMap(null); // 이전 오버레이 숨김
					}
					overlay.setMap(map); // 현재 오버레이 표시
					currentOverlay = overlay; // 현재 오버레이를 추적
				});

				// 마커에 마우스아웃 이벤트 등록
				window.kakao.maps.event.addListener(map, 'click', () => {
					if (currentOverlay) {
						currentOverlay.setMap(null);
						currentOverlay = null;
					}
					// overlay.setMap(null);
				});
			}
		});
	}, [searchKeyword]);
	return <div id="map" ref={mapRef} className="h-full w-full"></div>;
}
