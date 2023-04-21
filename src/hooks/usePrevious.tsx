import { useEffect, useRef } from "react";

/**
 * Replicates functionality of componentDidUpdate's pastProps/pastState when passed a value
 * @param any value
 * @returns previous value of said value
 *
 * From: https://davidwalsh.name/react-useprevious-hook
 */
export function usePrevious(value: any) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
}
