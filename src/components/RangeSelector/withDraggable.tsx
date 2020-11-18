/* istanbul ignore file */
import React, { useCallback } from "react";
import { useRef } from "react";

export const withDraggable = <Props extends Record<string, any>>(
  Component: React.ComponentType<Props>,
  handler: (e: number) => void
) => ({ ...props }) => {
  const startDragPos = useRef(0);
  const onDrag = useCallback((e: MouseEvent) => {
    handler(e.pageX - startDragPos.current);
  }, []);

  const onDragEnd = useCallback(() => {
    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", onDragEnd);
    window.removeEventListener("mouseleave", onDragEnd);
  }, [onDrag]);

  const onDragStart = (e: MouseEvent) => {
    startDragPos.current = e.pageX;
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", onDragEnd);
    window.addEventListener("mouseleave", onDragEnd);
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    return false;
  };

  return <Component onMouseDown={onDragStart} {...(props as Props)} />;
};
