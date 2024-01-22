"use client"
import { useCallback, useEffect, useRef, useState } from "react"
import {
	E_SDK_EVENT,
	E_SDK_EVENT_PAYLOAD,
	getVenueMaker,
	Mappedin,
	MappedinDestinationSet,
	MappedinLocation,
	MappedinMap,
	MappedinMapGroup,
	MappedinNode,
	MapView,
	showVenue,
	TGetVenueMakerOptions,
	TMapViewOptions,
} from "@mappedin/mappedin-js"
import "@mappedin/mappedin-js/lib/mappedin.css"

const useVenue = (options: TGetVenueMakerOptions) => {
	const [venue, setVenue] = useState<Mappedin>()
	useEffect(() => {
		getVenueMaker(options).then((v) => setVenue(v))
	}, [])
	return venue
}

const useMapView = (venue?: Mappedin, options?: TMapViewOptions) => {
	const [mapView, setMapView] = useState<MapView>()
	const mapRef = useRef<HTMLDivElement | null>(null)
	const rendering_mx_blocked = useRef(false)

	const [sortedVenueMaps, setSortedVenueMaps] = useState<MappedinMap[]>([])
	const [level, setLevel] = useState(0)

	useEffect(() => {
		if (!mapView || !venue || !sortedVenueMaps) return
		mapView.setMap(sortedVenueMaps[level].id)
	}, [level])

	const renderVenue = useCallback(
		async (el: HTMLDivElement, venue: Mappedin, options?: TMapViewOptions) => {
			if (rendering_mx_blocked.current === true || mapView != null) return

			rendering_mx_blocked.current = true
			//======================================================================================= rendering mutual exclusion start
			const _mapView = await showVenue(el, venue, options)
			const _sortedVenueMaps = venue.maps.sort(
				(a, b) => parseInt(a.name) - parseInt(b.name)
			)
			_mapView.setMap(_sortedVenueMaps[0].id)
			setMapView(_mapView)
			setSortedVenueMaps(_sortedVenueMaps)
			//======================================================================================= rendering mutual exclusion end
			rendering_mx_blocked.current = false
		},
		[rendering_mx_blocked, mapView, setMapView]
	)
	const elementRef = useCallback(
		(element: HTMLDivElement | null) => {
			if (element == null) return
			mapRef.current = element
			if (
				mapView == null &&
				venue != null &&
				rendering_mx_blocked.current == false
			)
				renderVenue(element, venue, options)
		},
		[mapView, venue, renderVenue, options]
	)

	return { mapView, elementRef, setLevel }
}

const shelf_number_to_code = (shelfNumber: number) => {
	//divide shelf number by 7 to get character
	// modulo 7 to get number, if greater than 7 set to 7
	const alphNumber = String.fromCharCode(shelfNumber / 7 + 'A'.charCodeAt(0))
	let remainder = shelfNumber % 7
	return `Shelf ${alphNumber}${remainder + 1}`
}

export default function Map({ shelfNumber }: { shelfNumber: number | null }) {
	const venue = useVenue({
		mapId: process.env.NEXT_PUBLIC_MAPPEDIN_ID!,
		key: process.env.NEXT_PUBLIC_MAPPEDIN_KEY!,
		secret: process.env.NEXT_PUBLIC_MAPPEDIN_SECRET!,
	})
	const { mapView, elementRef, setLevel } = useMapView(venue, {
		multiBufferRendering: true,
		xRayPath: true,
	})


	const hasRenderedInitPath = useRef(false)
	useEffect(() => {
		if (!mapView || !venue) return

		const initial_node = venue.locations.find(l => l.name === "240A")?.nodes[0]
		if (!initial_node) console.warn("initial node is invalid")
		else setUserLocation(initial_node) // just a default

		mapView.on(E_SDK_EVENT.CLICK, ({ position }) => {
			const coordinate = mapView.currentMap.createCoordinate(position.latitude, position.longitude)
			const nearestNode = coordinate.nearestNode
			setUserLocation(nearestNode)
		})

		mapView.on(E_SDK_EVENT.MAP_CHANGED, () => {
			if(hasRenderedInitPath.current) return
			console.log("map changed")
			const startLocation = venue.locations.find((location) => location.name === "Ike's Cafe")
			const destinations = [
				venue.locations.find((location) => location.name === 'Shelf A1'),
				venue.locations.find((location) => location.name == 'Shelf Z1'),
			] as MappedinLocation[]
			if (!destinations || !startLocation) return
			const directions = startLocation.directionsTo(new MappedinDestinationSet(destinations))
			mapView.Journey.draw(directions, {
				pathOptions: {
					nearRadius: 2.5,
					farRadius: 2.5,
				},
				inactivePathOptions: {
					nearRadius: 2,
					farRadius: 2,
					color: "lightblue",
				},
			})
			toggle_stack()
			hasRenderedInitPath.current = true
		})
	}, [mapView, venue])

	//labels
	const labelsOn = useRef(false)
	const toggle_labels = () => {
		if (mapView === undefined) return
		if (labelsOn.current) mapView.FloatingLabels.removeAll()
		else mapView.FloatingLabels.labelAllLocations()
		labelsOn.current = !labelsOn.current
	}

	// navigation
	const [userLocation, setUserLocation] = useState<MappedinNode>()
	const [shelfLocation, setShelfLocation] = useState<MappedinLocation>()
	useEffect(() => {
		if (!mapView) return
		if (!userLocation || !shelfLocation) return console.warn("userLocation or shelfLocation is null")
		const directions = userLocation.directionsTo(shelfLocation)
		if (directions.path.length == 0 || directions.distance == 0) return console.warn("Direction not valid")
		mapView.Journey.draw(directions, {
			pathOptions: {
				color: "blue",
				nearRadius: 1,
				farRadius: 0,
			},
		})
	}, [userLocation, shelfLocation])
	useEffect(() => {
		if (!shelfNumber) return console.log("shelf number changed to no shelf number")
		console.log("shelf number changed to ", shelf_number_to_code(shelfNumber))

		if (!venue) return;
		setShelfLocation(venue.locations.find(l => l.name === shelf_number_to_code(shelfNumber)))
	}, [shelfNumber])


	const [stackOn, setStackOn] = useState(false)
	const toggle_stack = async () => {
		if (mapView === undefined) return
		if (stackOn) {
			await mapView.StackedMaps.disable()
			setStackOn(false)
		}
		else {
			try {
				await mapView.StackedMaps.enable({ verticalDistanceBetweenMaps: 30 })
				await mapView.StackedMaps.showOverview()
				setStackOn(true)
			} catch(e) {
				console.error("stack toggle error:", e)
				setStackOn(false)
			}
		}
	}

	return (
		<div ref={elementRef} className="w-screen h-screen relative">
			<div className="absolute top-36 left-2 z-50 flex flex-col gap-y-2">
				<button className="bg-white p-2" onClick={toggle_labels}>Toggle Labels</button>
				<button className="bg-white p-2" onClick={toggle_stack}>Toggle Stack</button>
				<div className="flex flex-col text-xl border-rounded-md">
					{
						[3, 2, 1, 0].map(l => (
							<button
								className="w-8 h-8 bg-slate-100 m-1 p-0 text-center rounded-sm"
								onClick={() => { setLevel(l) }} key={`level-button-${l}`}
							>
								{l + 1}
							</button>
						))
					}
				</div>
			</div>
		</div>
	)
}