import { useRef } from "react";

type CaretPositionFromPoint = (x: number, y: number) => { offset: number } | null;

type CaretRangeFromPoint = (x: number, y: number) => Range | null;

function getCaretOffsetFromPoint(textarea: HTMLTextAreaElement, x: number, y: number) {
	textarea.focus();

	const doc = document as Document & {
		caretPositionFromPoint?: CaretPositionFromPoint;
		caretRangeFromPoint?: CaretRangeFromPoint;
	};

	if (doc.caretPositionFromPoint) {
		const pos = doc.caretPositionFromPoint(x, y);
		if (!pos) return textarea.selectionStart ?? 0;
		return pos.offset;
	}

	if (doc.caretRangeFromPoint) {
		const range = doc.caretRangeFromPoint(x, y);
		if (!range) return textarea.selectionStart ?? 0;
		return range.startOffset;
	}

	return textarea.selectionStart ?? 0;
}

export function useTextareaCaretFix() {
	const selecting = useRef(false);
	const startPos = useRef(0);

	const onPointerDown = (e: React.PointerEvent<HTMLTextAreaElement>) => {
		e.stopPropagation();

		const el = e.currentTarget;
		selecting.current = true;

		const pos = getCaretOffsetFromPoint(el, e.clientX, e.clientY);
		startPos.current = pos;

		el.setSelectionRange(pos, pos);

		const move = (ev: PointerEvent) => {
			if (!selecting.current) return;

			const end = getCaretOffsetFromPoint(el, ev.clientX, ev.clientY);

			if (end >= startPos.current) {
				el.setSelectionRange(startPos.current, end, "forward");
			} else {
				el.setSelectionRange(end, startPos.current, "backward");
			}
		};

		const up = () => {
			selecting.current = false;
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", up);
		};

		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", up);
	};

	return { onPointerDown };
}
