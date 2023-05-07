import React, { useEffect, useRef } from "react";

/**
 * Custom React Hook by Dan Abramov https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * slightly updated to use Typescript
 * @param {Function} callback Method to call
 * @param {Number | null} delay Amount of time between calls of callback in ms (pass null to pause the interval)
 */
export function useInterval(callback: Function, delay: number | null) {
	const savedCallback = useRef<Function>();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			if (savedCallback?.current) {
				savedCallback.current();
			}
		}
		if (delay !== null) {
			const id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}
